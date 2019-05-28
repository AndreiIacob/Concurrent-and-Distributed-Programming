const fs = require("fs");

function createFolderStructure(path) {
    const folders = path.split('/');

    let newFolder = '/memory';
    folders.forEach(function (folder) {
        newFolder += ('/' + folder);
        fs.mkdir(newFolder, function (err) {
            if(err){
                console.log(err);
            }
        });
    });
}

$$.swarm.describe("storeManifestFile", {

    start: function (csbName, manifestContent) {
        if (csbName.indexOf('/') !== -1) {
            createFolderStructure(csbName);
        }

        var path = "/memory/" + csbName + "-manifest.json";

        fs.writeFile(path, JSON.stringify(manifestContent), (err) => {
            console.log(err);
            this.swarm("interaction", "onComplete", path);
        });
    }
})
