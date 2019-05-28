import PinManager from './PinManager';

let interactions = {};
let readPin = function (noTries) {
    if (noTries === 3) {
        PinManager.showModalPin(null, (pin) => {
            this.swarm("validatePin", pin, noTries);
        })
    }
    else {
        PinManager.invalidatePin();
        if (noTries !== 0) {
            PinManager.showModalPin("Invalid PIN. Please try again", (pin) => {
                this.swarm("validatePin", pin, noTries);
            })
        } else {
            PinManager.blockAccess("You entered a wrong pin for 3 times. Please try again in 1 minute.")
        }
    }

};

class InteractionService {

    constructor(webView, name) {
        this.interact = null;
        this.callbacks = {};
        this.newInstance(webView, name);
    }

    newInstance(webView, name) {
        let self = this;

        function receiveMessage(message) {

            if (message.data && message.data.webViewIsReady === true) {
                var interactProvider = window.reactClientRequire('interact');

                //WebView from web
                if (webView && typeof document !== "undefined") {
                    interactProvider.enableReactInteractions();
                    self.interact = interactProvider.createWindowInteractionSpace("iframe", webView.frameRef.contentWindow);
                    window.removeEventListener("message", receiveMessage, false);
                }
                else
                //WebView from mobile
                if (webView) {
                    interactProvider.enableWebViewInteractions();
                    self.interact = interactProvider.createWindowInteractionSpace("iframe", webView, webView);
                }
                else if (typeof document !== "undefined") {
                    interactProvider.enableReactInteractions();
                    let iframe = document.getElementsByTagName("iframe")[0].contentWindow;
                    self.interact = interactProvider.createWindowInteractionSpace("iframe", iframe);
                }
                self.dispatchCallbacks();
            }
        }


        if (typeof window.addEventListener !== "undefined") {
            window.addEventListener("message", receiveMessage, false);
        }
        else {
            if (webView) {
                receiveMessage({
                    data: {
                        webViewIsReady: true
                    }
                })
            }
        }

        interactions[name ? name : "global"] = self;
    }

    createCSB(csbName, backupUrl, callback) {
        if (typeof backupUrl === "function") {
            callback = backupUrl;
            backupUrl = null;
        }

        let self = this;
        let createCSBFn = function () {
            self.interact.startSwarm("pskwallet.createCsb", "start", csbName).on({
                onComplete: function (completedInfo) {
                    if (completedInfo) {
                        console.log(completedInfo);
                    }
                },
                handleError: function (error) {
                    callback(error);
                },
                onError: function (error) {
                    console.log(error)
                },
                readPin: readPin,

                createPin: function (defaultPin) {
                    this.swarm("loadBackups", defaultPin);
                },

                printSensitiveInfo: function (seed, defaultPin) {
                    let seedBuffer = Buffer.from(seed);
                    callback(null, true, seedBuffer.toString());
                    PinManager.setDefaultPin(defaultPin);
                    console.log("Seed: ", seedBuffer.toString());
                    console.log("Pin: ", defaultPin)
                },
                printInfo: function (info) {
                    callback(null, info);
                }
            });
        };

        if (backupUrl) {
            this.interact.startSwarm("pskwallet.addBackup", "start", backupUrl).on({
                readPin: readPin,
                createPin: function (defaultPin) {
                    this.swarm('addBackup', defaultPin);
                },
                handleError: function (err) {
                    console.log(err);
                },
                printInfo: function (info) {
                    console.log(info);
                    createCSBFn();
                }
            });
        }
        else {
            createCSBFn()
        }
    }

    changeDefaultPin(pin, callback) {
        this.interact.startSwarm("pskwallet.setPin", "start").on({
            readPin: readPin,
            enterNewPin: function () {
                this.swarm("actualizePin", pin);
            },
            handleError: (err) => {
                console.log(err);
            },
            printInfo: function (info) {
                callback(null, info);
            }
        })
    }

    resetPin(seed, newPin, callback) {
        this.interact.startSwarm("pskwallet.resetPin", "start").on({
            readSeed: function (noTries) {
                this.swarm("validateSeed", seed, noTries);
            },

            insertPin: function (noTries) {
                this.swarm("actualizePin", newPin);
            },
            handleError: (err) => {
                callback(err);
            },
            printInfo: function (info) {
                callback();
                console.log(info);
            }
        })
    }

    doBackup(callback) {

        this.interact.startSwarm("pskwallet.saveBackup", "start", "/").on({
            readPin: readPin,
            handleError: function (err) {
                console.log(err);
            },
            csbBackupReport: function ({errors, successes}) {
                if (errors.length === 0 && successes.length === 0) {
                    console.log('All CSBs are already backed up');
                }

                errors.forEach(({alias, backupURL}) => {
                    console.log(`Error while saving file ${alias} on ${backupURL}`);
                });

                successes.forEach(({alias, backupURL}) => {
                    console.log(`Successfully backed up file ${alias} on ${backupURL}`);
                });

                callback();
            }
        });
    }


    getCsbNames(csbsPath, callback) {
        if (this.interact) {
            this.interact.startSwarm("pskwallet.listCSBs", "start", csbsPath).on({
                __return__: function (csbs) {
                    console.log(csbs);
                    callback(null, csbs);
                },
                onError: function (error) {
                    console.log(error)
                },
                readPin: readPin,
                handleError: function (err, message) {
                    console.error(err, message);
                },
                noMasterCSBExists: function () {
                    callback(null, []);
                }
            });
        }
        else {
            this.registerCallback("getCsbNames", arguments);
        }
    }

    restoreCSB(path, seed, callback) {
        this.interact.startSwarm("pskwallet.restore", "start", path).on({
            readSeed: function () {
                this.swarm("restoreCSB", seed)
            },
            printInfo: function (info) {
                console.log(info);
                callback();
            },
            handleError: function (err) {
                if (err) {
                    callback(err);
                }
                console.log(err);
            },
            readPin: readPin
        });
    }


    saveCsbManifest(csbName, manifest, callback) {

        this.interact.startSwarm("storeManifestFile", "start", csbName, manifest).on({
            onComplete: (manifestPath) => {
                if (manifestPath) {
                    console.log(manifestPath);
                    this.interact.startSwarm("pskwallet.attachFile", "start", csbName + "/manifest", manifestPath).on({
                        readPin: readPin,
                        handleError: function (err) {
                            console.log(err);
                        },
                        printInfo: function (info) {
                            console.log(info);
                            callback();
                        }
                    });

                }
            }
        });
    }

    addFilesToCSB(csbPath, csbAlias, progressCallback, callback) {
        this.interact.startSwarm('addFilesToCsb', "start", csbPath + "/" + csbAlias).on({
            onComplete: function (info) {
                callback(info);
            },
            readPin: readPin,
            onProgress: function (progress) {
                progressCallback(progress);
            }
        })
    }

    notifyWhenFilesWereSelected(callback) {
        if (this.interact) {
            this.interact.startSwarm("notifyWhenFilesWereLocallyPersisted", "start").on({
                onComplete: function (files) {
                    callback(files);
                }
            })
        }
        else {
            this.registerCallback('notifyWhenFilesWereSelected', arguments);
        }
    }

    notifyWhenFormIsComplete(callback) {
        if (this.interact) {
            this.interact.startSwarm("notifyWhenFormIsComplete", "start").on({
                onComplete: function (files) {
                    callback(files);
                }
            })
        }
        else {
            this.registerCallback('notifyWhenFormIsComplete', arguments);
        }
    }

    extractAssetFromCSB(assetPath, progressCallback, callback) {
        if (this.interact) {
            this.interact.startSwarm('extractAssetFromCSB', "start", assetPath).on({
                onExtractionComplete: function (assetName) {
                    callback('Your asset [ ' + assetName + ' ] has been decrypted', assetName);
                },
                onError: function (errInfo) {
                    callback(errInfo);
                },
                onProgress: function (progress) {
                    progressCallback(progress);
                },
                readPin: readPin,
            });
        } else {
            this.registerCallback('extractAssetFromCSB', arguments);
        }
    }

    displayExtractedAssetFromCSB(assetPath, type, progressCallback, callback) {
        if (this.interact) {
            this.interact.startSwarm('extractAssetFromCSB', "getAsset", assetPath, type).on({
                onComplete: function (info) {
                    callback(true, info);
                },
                onError: function (err, errInfo) {
                    callback(false, errInfo);
                },
                onCloseIframe: function () {
                    callback(null);
                },
                onProgress: function (progress) {
                    progressCallback(progress);
                }
            });
        } else {
            this.registerCallback('displayExtractedAssetFromCSB', arguments);
        }
    }

    registerCallback(fnName, callback) {

        if (!this.callbacks[fnName]) {
            this.callbacks[fnName] = [];
        }
        this.callbacks[fnName].push(callback);
    }

    dispatchCallbacks() {
        for (let fnName in this.callbacks) {
            let fnCallbacks = this.callbacks[fnName];
            fnCallbacks.forEach((args) => {
                this[fnName].apply(this, args);
            })
        }

        this.callbacks = [];
    }

}


class InteractionsManager {

    static getInstance(interactView, name) {
        if (interactView) {
            if (interactions[name]) {
                return interactions[name];
            }
            else {
                interactView.frameRef.contentWindow.addEventListener("unload", function () {
                    if (interactions[name]) {
                        delete interactions[name];
                    }
                });
                return new InteractionService(interactView, name);
            }

        }
        else {
            if (interactions['global']) {
                return interactions['global'];
            }
            else {

                return new InteractionService();
            }
        }
    }

}

export default InteractionsManager;

