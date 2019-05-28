$$.requireBundle('psknode');
$$.requireBundle('pskclient');
$$.requireBundle('virtualMQ');
require('callflow');
require('pskwallet').init();

const apiBaseUrl = 'http://localhost:5005/api';


function getUsedCount(){
    $.done( apiBaseUrl + "/asset/ini");
}

function checkContract(data){
    var contractClauses = ; 
    var isDone = true;
    contractClauses.forEach(function(clause){
        var validateFunc = clause.validFunc; 
        if(validateFunc){
            eval(validateFunc);
            if(isDone)
                isDone = validate(data);
        }
    });
    

    }

var rowCnt = 1;

function addRow(){
    $( "#rowContainer" ).append( `
            <div class='row' id='row${rowCnt}'>
                    <label for="name">Asset Name: </label>
                    <input type="text" name="name"><br>
                    <label for="uses">Number of Uses: </label>
                    <input type="number" name="uses"><br>
                    <label for="end">End Date: </label>
                    <input type="date" name="end"><br>
                    Validation Function: <br>
                    <textarea rows="5" cols="100" class="textarea-tall">
function validate(assetData){
    /* Input Code here */
    return true;
}
                    </textarea>
            </div>
` );
    rowCnt += 1;

}

function submit(){
    var contractClauses = [];

    var contractName = $( "input[name='contract']" ).val(); 

    $( ".row" ).each(function() {
        var clause = {};
        clause.name = $( this ).find( "input[name='name']" ).val(); 
        clause.uses = $( this ).find( "input[name='uses']" ).val(); 
        clause.end = $( this ).find( "input[name='end']" ).val(); 
        clause.validFunc = $( this ).find( "textarea" ).val();
        contractClauses.push(clause);
      });

    var csbFileUploader = new CSBFileUploader(fileInput.files);
    csbFileUploader.persistFilesLocally(function (filesName) {
        FilesLoadedObserver.forEach((cbk)=>cbk(filesName));
    });

    console.log(contractClauses);
    var filepath = contractName + ".json";
    let fs = require("fs");
    var data = JSON.stringify(contractClauses);
    fs.writeFile(filepath, data, 'utf8');
    CSBFileUploader([filepath]);
}

function downloadAsset(){
    var strData;
    $$.swarm.describe("getAssetTxt", {
        getAsset: function (assetPath, type) {
            var self = this;

            const fs = require('fs');
            fs.readFile(assetPath, (err, data) => {
                strData = ascii2txt(data);
                if (err) {
                    self.swarm('interaction', 'onError', err, 'File ' + assetPath + ' encountered some errors');
                } else {
                    increment(assetPath);
                    self.swarm('interaction', 'onComplete', 'Your asset [' + assetPath + '] will be opened soon...');
                    assetDisplayHandler.call(self, data, assetPath, type);
                }
            });
        }
    });
    return strData;
}

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
