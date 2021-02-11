const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://yapoey:Eio4kjkThTdIoCsS@cluster0.92pax.mongodb.net/helloDB?retryWrites=true&w=majority')
        .then(client => {
            console.log('Conneted');
            _db = client.db();
            callback()
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect; //connecting and storing the connection to database
exports.getDb = getDb; //where return access to that db -> provide connection pooling