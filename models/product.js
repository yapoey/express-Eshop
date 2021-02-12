const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb()
        let dbOp;
        if (this._id) {
            //update this product
            dbOp = db
                .collection('products')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this })
                //updateOne take 2 arguments on filtering ex)_id, the data
        } else {
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    static fetchAll() {
        const db = getDb()
            //return db.collection('products').find();//return one by one document from db
        return db
            .collection('products')
            .find()
            .toArray() // return all documents from db
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) }) //find one by one filtering with id
            .next() //calling next to go to next document in db
            .then(product => {
                console.log(product)
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteById(prodId) {
        console.log(prodId)
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('deleted')
            })
            .catch(err => {
                console.log(err)
            })
    }
}


module.exports = Product;