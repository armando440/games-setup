const { MongoClient } = require('mongodb');

const Mongoclient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.DB_URL;
const db_name = 'entertainment';
const col_name = 'games';
const options ={
    useUnifiedTopology: true
}

const readGames = () => {
    const iou = new Promise ((resolve, reject) =>{
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({}).toArray((err, docs) =>{
                assert.equal(err, null);
                resolve(docs);
                client.close();
            })
        });
    });
    return iou;
}

module.exports ={
    readGames
}