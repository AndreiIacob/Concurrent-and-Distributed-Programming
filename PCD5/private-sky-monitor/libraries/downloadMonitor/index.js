const states = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE"
};

$$.asset.describe("Monitor", {
    public: {
        file2cnt: "object",
        // alias: "string",
        // uid: "string:alias",
        owner: "string",
        // amount: "number",
        // symbol: "string",
        // state: "string"
    },
    init: function(uid, symbol, owner){
        if(!!this.owner){
            return false;
        }

        this.file2cnt = {};

        return true;
    },
    increment: function(filepath){
        if(filepath in Object.keys(this.file2cnt))
            this.file2cnt[filepath] += 1;
        else  
            this.file2cnt[filepath] = 0;
    },
    countAll: function(){
        return this.file2cnt;
    },
    count: function(filepath){
        return this.file2cnt[filepath];
    },
    view: function(filepath){
        `
        <!DOCTYPE html>
    <html>
    <head>
        <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          
          tr:nth-child(even) {
            background-color: #dddddd;
          }
          </style>
          </head>
          <body>
          
          <h2>CSBUI Downloads</h2>
          
          <table>
    
          <tr>
            <td>Filename</td>
            <td>Download Count</td>
          </tr>
          `
          var rows = getAllPaths();
          
          Object.entries(this.file2cnt).forEach((keycnt) => {
            var key = keycnt[0];
            var cnt = keycnt[1];
            htmlRes += `
            <tr>
              <td>${key}</td>
              <td>${cnt}</td>
            </tr>`
          });
      
          htmlRes += `
            </table>
            </body>
          `;

        return this.file2cnt[filepath];
    },

});