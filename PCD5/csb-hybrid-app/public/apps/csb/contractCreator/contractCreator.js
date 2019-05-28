$$.requireBundle('psknode');
$$.requireBundle('pskclient');
$$.requireBundle('virtualMQ');
require('callflow');
require('pskwallet').init();


var interactionProvider = require("interact");
interactionProvider.enableIframeInteractions();
interactionProvider.enableLocalInteractions();
var interaction = interactionProvider.createWindowInteractionSpace("iframe",window);
interaction.init();
var localInteraction = interactionProvider.createInteractionSpace("local", window);


var rowCnt = 1;

function addRow(){
    $( "#rowContainer" ).append( `
<div class='row' id='row0'>
    <label for="name">Asset Name: </label>
    <input type="text" name="name"><br>
    <label for="uses">Number of Uses: </label>
    <input type="number" name="uses"><br>
    <label for="end">End Date: </label>
    <input type="date" name="end"><br>
    <label> Validation Function:</label> <br>
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

   

    console.log(contractClauses);
    var filepath = contractName + ".json";
    let fs = require("fs");
    var data = JSON.stringify(contractClauses);

    var a = document.getElementById("link");
    var encodedData = window.btoa(data);
    a.href = "data:application/octet-stream;charset=utf-8;base64," + encodedData;

    fs.writeFile(filepath, data, 'utf8', function (err){
        var fileinfo = {
            "lastModified" : 1551255309089,
            "name": filepath,
            "size": data.length * 2,
            "type": "text/plain",
        "webkitRelativePath": ""
        };
        
        fs.readFile(filepath,'', function(err, data){
            console.log('data', data);
            
        var csbFileUploader = new CSBFileUploader(data);
        csbFileUploader.persistFilesLocally(function (filesName) {
            FilesLoadedObserver.forEach((cbk)=>cbk(filesName));
        });
        });
        
    } );

    
}

function CSBFileUploader(filesList) {
    console.log("filesList", filesList);
    let files = Array.from(filesList);
    console.log("files", files);

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
                        console.log(file);
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


let FilesLoadedObserver = [];


$$.swarm.describe("notifyWhenFormIsComplete", {
    start: function () {
        FilesLoadedObserver.push((filesName)=>{
            this.swarm("interaction", "onComplete", filesName);
        })
    }
});


var contractNameInput = document.getElementById("contractName");
var submitBtn = document.getElementById("submitBtn");
contractNameInput.addEventListener("change", function () {
    FilesLoadedObserver.forEach((cbk)=>cbk(contractNameInput.value ));
});