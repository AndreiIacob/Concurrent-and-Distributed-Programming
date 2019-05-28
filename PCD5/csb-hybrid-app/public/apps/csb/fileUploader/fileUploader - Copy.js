function CSBFileUploader(filesList) {

    let files = Array.from(filesList);

    var self = null;
    var innerSwarmHandler = null;
    $$.swarm.describe("addFilesToCsb", {

        start: function (csbFullAlias) {
            self = this;
            localInteraction.startSwarm("pskwallet.attachFile", "start", csbFullAlias, files[0].name).on({
                handleError: function (error) {
                    console.log(error);
                },
                onError: function (error) {
                    console.log(error)
                },
                reportProgress:function(progress){
                    self.swarm("interaction", "onProgress", progress);
                },
                readPin: function(noTries){
                    innerSwarmHandler = this;
                    self.swarm("interaction","readPin", noTries)
                },
                printInfo: function (info) {
                    self.swarm("interaction", "onComplete", info);
                }
            });


        },

        validatePin:function(pin, noTries){
            innerSwarmHandler.swarm("validatePin", pin, noTries);
        }
    });

    this.persistFilesLocally = function (callback) {

        var sequence = Promise.resolve();
        let filesName = [];
        files.forEach((file) => {
            sequence = sequence.then(() => {
                return new Promise(resolve => {
                    // if file type could be detected
                    if (file !== null) {
                        let fileReader = new FileReader();
                        fileReader.onload = (function (file) {
                            return function (e) {
                                writeFileLocally(e, file, resolve);
                                filesName.push(file.name)
                            }
                        })(file);
                        fileReader.readAsArrayBuffer(file, 0, file.size - 1);
                    }
                })
            });

            sequence.then(()=>callback(filesName));
        });
    };

    function writeFileLocally(event, file, callback) {
        let fs = require("fs");
        let writeStream = fs.createWriteStream(file.name);
        writeStream.write(event.target.result);
        writeStream.end();

        writeStream.on("finish", function () {
            console.log("File " + file.name + " was written");
            callback();
        });
    }

};






