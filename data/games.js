const { MongoClient } = require('mongodb');//const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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

const readGameByID = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({_id: new ObjectID(id) }).toArray((err, docs) =>{
                assert.equal(err, null);
                resolve(docs[0]);
                client.close();
            })
        });
    });
    return iou;
}

const createGame = (game) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.insertOne(game, (err, result) => {
                assert.equal(err, null);
                resolve(result.ops[0]);
                client.close();
            });
        });
    });
    return iou; 
}

const upsertGame = (id, game) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
             const db = client.db(db_name);
             const collection = db.collection(col_name);
            collection.findAndModify({_id: new ObjectID(id) },
              null,
              { $set: {...game} },
              { upsert: true },
              (err, result) => {
                assert.equal(err, null);
                readGameByID(id)
                   .then(game => resolve(game))
                   .then(() => client.close());
                }
            );
        });
    });
    return iou;
}


const deleteGame = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndDelete({_id: new ObjectID(id) }, (err, result) => {
                assert.equal(err, null);
                resolve(result.value);
                client.close();
            });
        });
    });
    return iou;
}

module.exports ={
    createGame,
    readGames,
    upsertGame,
    deleteGame
    
}
