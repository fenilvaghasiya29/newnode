var RSVP = require('rsvp');
///var logger = require('../config/logger');
var mongoClient = require('mongodb').MongoClient;
//var auth = require('../config/auth');
ObjectId = require('mongodb').ObjectID;


function tag() { }
module.exports = tag;

tag.prototype.getTagInfo = function () {

    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
               
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("tag").find({}).toArray(function (err, result) {
                responseTag = new Object();
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                
                responseTag = result;
                
                fulfill(responseTag);
            });
        });


    });
}

tag.prototype.postTagInfo = function (tagName) {
    
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
                
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("tag").insertOne({ tagName: tagName }, function (err, result) {

                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                dbs.collection("tag").find({ tagName: tagName }).toArray(function (err, result) {
                    if (err) {
                        console.log('Error in  Database Query');
                        
                        reject(err);
                    }
                    responseTag = new Object();
                    responseTag = result;
                    
                    fulfill(responseTag);
                });

            });
        });


    });
}
tag.prototype.putTagInfo = function (tagId, tagName) {
    
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
             
                reject(err);
            }
            var dbs = db.db('CRB');
            var oldValues = { _id: new ObjectId(tagId) };
            var newValues = { $set: { tagName: tagName } };
            dbs.collection("tag").updateOne(oldValues, newValues, function (err, result) {
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                console.log(tagId);
                if (result.modifiedCount == 1 && result.matchedCount == 1) {
                    responseTag = new Object();
                    _id=tagId;
                    console.log(_id);
                    responseTag = {_id,tagName};
                    
                    fulfill(responseTag);
                } else {
                   
                    reject();
                }

            });
        });


    });
}
 tag.prototype.deleteTagInfo = function (tagId) {
   
     return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                // logger.error('Error in  Database Connection');
                console.log('Error in  Database Connection');
                // logger.debug('<deleteTagInfo');
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("tag").deleteOne({ _id: new ObjectId(tagId) }, function (err, obj) {
                responseTag = new Object();
                if (err) {
                    // logger.error('Error in  Database Query');
                    console.log('Error in  Database Query');
                    // logger.debug('<deleteTagInfo');
                    reject(err);
                }
               responseTag = obj.deletedCount;
                console.log(obj);
                if (obj.deletedCount == 0) {
                   // logger.debug('<deleteTagInfo');
                    reject(responseTag);
                } else {
                   // logger.debug('<deleteTagInfo');
                    fulfill(responseTag);
                }

            });
        });


    });
}
