const pg = require('pg');
const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'csbuiledger',
password: '4262486099985211',
port: '5432'});

pool.query("SELECT * from Ledger", (err, res) => {
console.log(err, res);
console.log(res['rows']);

});

// initLedger("tst.txt");
// increment("tst.txt");
    
// pool.query("SELECT * from Ledger", (err, res) => {
//     console.log(res['rows']);
//     });

console.log( getAllPaths());

async function getPath(filepath){
    var res = await pool.query("SELECT * from Ledger where filepath = $1", [filepath]);
    return res['rows'][0];
}

async function getAllPaths(){
    var res = await pool.query("SELECT * from Ledger");
    return res.rows;
}

async function addCnt(filepath, cnt2add){
    pool.query("SELECT * from Ledger where filepath = $1", [filepath], (err, res) => {
        if(res['rows'].length < 1){
            initLedgerInc(filepath, cnt2add);
            } else {
            const curCount = res['rows'][0]['count']; 
            pool.query("UPDATE Ledger SET count = $2 where filepath = $1", [filepath, (curCount + cnt2add)], (err, res) => {
            if(err)
                console.log(err);
            });
        }
    });
}

function increment(filepath){
    addCnt(filepath, 1);
}

function initLedgerInc(filepath, cnt){
    pool.query("Insert into Ledger Values($1, $2)", [filepath, cnt], (err, res) => {
        if(err)
            console.log(err);
    });
}

function initLedger(filepath){
    pool.query("Insert into Ledger Values($1, 0)", [filepath], (err, res) => {
        if(err)
            console.log(err);
    });
}

const headerURL = 'http://localhost:3000';

// Set up the express app
const express = require('express');
const app = express();

app.use(express.urlencoded());
app.use(express.json());      // if needed

app.get('/api/assets', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', headerURL);
    console.log("Get");
    return res.status(200).send(
        await getAllPaths()
    );
});

app.post('/api/asset/init', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', headerURL);
    if(!req.body.filepath) {
    return res.status(400).send({
        success: 'false',
        message: 'filepath is required'
    });
    }
    
    initLedger(req.body.filepath);
    
  return res.status(200).send({
    success: 'true',
    message: 'Entry Added'
  })
});

app.post('/api/asset/increment', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', headerURL);
    console.log(req.body);
    if(!req.body.filepath) {
    return res.status(400).send({
        success: 'false',
        message: 'filepath is required'
    });
    } 
    
    const cnt = parseInt(req.body.count);
    if(cnt)
        addCnt(req.body.filepath, cnt);
    else
        increment(req.body.filepath);
    
  return res.status(200).send({
    success: 'true',
    message: 'Entry Incremented'
  })
});


app.get('/api/asset/:id', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', headerURL);
    return res.status(200).send(
        await getPath(req.query.id)
    );
});

app.post('/api/asset', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', headerURL);
    if(!req.body || !req.body.filepath) {
        return res.status(400).send({
            success: 'false',
            message: 'filepath is required'
        });
        }

    return res.status(200).send(
        await getPath(req.body.filepath)
    );
});


const PORT = 5005;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});