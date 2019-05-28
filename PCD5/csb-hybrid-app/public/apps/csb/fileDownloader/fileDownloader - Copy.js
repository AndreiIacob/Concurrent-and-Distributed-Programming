$$.requireBundle('psknode');
$$.requireBundle('pskclient');
$$.requireBundle('virtualMQ');
require('callflow');
require('pskwallet').init();

var interactionProvider = require('interact');
interactionProvider.enableIframeInteractions();
interactionProvider.enableLocalInteractions();
var interaction = interactionProvider.createWindowInteractionSpace('iframe', window);
interaction.init();
var localInteraction = interactionProvider.createInteractionSpace('local', window);
let innerSwarmHandler = null;

$$.swarm.describe('extractAssetFromCSB', {
    start: function (assetPath) {
        var self = this;
        localInteraction.startSwarm('pskwallet.extractFile', 'start', assetPath).on({
            printInfo: function (info) {
                console.log(info)
            },

            __return__: function (fileNames) {
                if (typeof fileNames !== 'string') {
                    fileNames = fileNames[0];
                }

                console.log("fileNames", fileNames);
                console.log("assetPath", assetPath);

                self.swarm('interaction', 'onExtractionComplete', fileNames);
            },

            handleError: function (err, errInfo) {
                console.log(err);
                self.swarm('interaction', 'onError', err, errInfo);
            },
            onError: function (err) {
                console.log(err);
                self.swarm('interaction', 'onError', err, errInfo);
            },
            readPin: function (noTries) {
                innerSwarmHandler = this;
                self.swarm("interaction","readPin", noTries)
            },
            reportProgress:function(progress){
                self.swarm("interaction","onProgress", parseInt(progress));
            }
        });
    },

    validatePin:function(pin, noTries){
        innerSwarmHandler.swarm("validatePin", pin, noTries);
    },

    getAsset: function (assetPath, type) {
        var self = this;

        const fs = require('fs');
        fs.readFile(assetPath, (err, data) => {
            console.log(ascii2txt(data));
            if (err) {
                self.swarm('interaction', 'onError', err, 'File ' + assetPath + ' encountered some errors');
            } else {
                self.swarm('interaction', 'onComplete', 'Your asset [' + assetPath + '] will be opened soon...');
                assetDisplayHandler.call(self, data, assetPath, type);
            }
        });
    }
});

function ascii2txt(data) {
    var res = "";
    data.forEach(function (char) {
        res += String.fromCharCode(char); 
    } );
    return res;
}

Object.defineProperty(Uint8Array.prototype, 'chunk', {
    value: function (chunkSize) {
        var chunks = [];
        for (var i = 0; i < this.length; i += chunkSize) {
            chunks.push(this.slice(i, i + chunkSize));
        }
        return chunks;
    }
});

const parseMimeType = (buffer) => {
    let bytes = [];
    buffer.forEach((byte) => {
        bytes.push(byte.toString(16))
    })
    const signature = bytes.join('').toUpperCase();
    return getMimeType(signature.slice(0, 8));
}

const getMimeType = (signature) => {
    // MIMETypes supported by browsers
    switch (signature) {
        case '89504E47':
            return { type: 'image', value: 'image/png' }
        case '47494638':
            return { type: 'image', value: 'image/gif' }
        case '25504446':
            return { type: 'pdf', value: 'application/pdf' }
        case 'FFD8FFDB':
        case 'FFD8FFE0':
            return { type: 'image', value: 'image/jpeg' }
        case '66747970':
            return { type: 'video', value: 'video/mp4' }
        default:
            return { type: 'unknown', value: '' }
    }
}

function setupCloseIframeEventHandler() {
    var self = this;

    var closeIframe = document.getElementById('closeIframe');
    closeIframe.style.display = 'block';

    closeIframe.onclick = function () {
        closeIframe.style.display = 'none';
        // swarm to hide the iframe in order to be able of downloading the asset
        self.swarm('interaction', 'onCloseIframe');
    };
}

function handleDownload(file, fileName) {
    const link = document.createElement('a');
    link.href = file;
    link.download = fileName;
    link.click();
}

function handleDisplayAssetInPage(file, mimeType, assetPath) {
    const objectType = mimeType.type === 'image' ? 'img' : 'object';
    const documentObject = document.createElement(objectType);

    if (objectType === 'img') {
        documentObject.src = file;
        documentObject.alt = assetPath;
    } else {
        documentObject.width = window.innerWidth;
        documentObject.height = window.innerHeight;
        documentObject.data = file;
        documentObject.type = mimeType.value;
    }

    document.getElementById('asset').append(documentObject);

    setupCloseIframeEventHandler.call(this);
}

function assetDisplayHandler(data, assetPath, type) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        const file = new File([data], assetPath);
        window.navigator.msSaveOrOpenBlob(file);
        return;
    }

    const mimeType = parseMimeType(data);
    const file = new File([data], assetPath, { type: mimeType.value });
    const fileObj = window.URL.createObjectURL(file);

    if (mimeType.type === 'unknown' || type === 'download') {
        handleDownload(fileObj, assetPath);
    } else {
        handleDisplayAssetInPage.call(this, fileObj, mimeType, assetPath);
    }

    setTimeout(() => {
        window.URL.revokeObjectURL(file);
    }, 100);
}