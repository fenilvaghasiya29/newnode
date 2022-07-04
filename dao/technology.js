var RSVP = require('rsvp');
///var logger = require('../config/logger');
var mongoClient = require('mongodb').MongoClient;
//var auth = require('../config/auth');
ObjectId = require('mongodb').ObjectID;


function technology() { }
module.exports = technology;

technology.prototype.getTechnologyInfo = function () {

    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
               
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("technology").find({}).toArray(function (err, result) {
                responseTechnology = new Object();
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                
                responseTechnology = result;
                
                fulfill(responseTechnology);
            });
        });


    });
}

technology.prototype.postTechnologyInfo = function (technologyName) {
    
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
                
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("technology").insertOne({ technologyName: technologyName }, function (err, result) {

                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                dbs.collection("technology").find({ technologyName: technologyName }).toArray(function (err, result) {
                    if (err) {
                        console.log('Error in  Database Query');
                        
                        reject(err);
                    }
                    responseTechnology = new Object();
                    responseTechnology = result;
                    
                    fulfill(responseTechnology);
                });

            });
        });


    });
}
technology.prototype.putTechnologyInfo = function (technologyId, technologyName) {
    
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
             
                reject(err);
            }
            var dbs = db.db('CRB');
            var oldValues = { _id: new ObjectId(technologyId) };
            var newValues = { $set: { technologyName: technologyName } };
            dbs.collection("technology").updateOne(oldValues, newValues, function (err, result) {
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                console.log(technologyId);
                if (result.modifiedCount == 1 && result.matchedCount == 1) {
                    responseTechnology = new Object();
                    _id=technologyId;
                    console.log(_id);
                    responseTechnology = {_id,technologyName};
                    
                    fulfill(responseTechnology);
                } else {
                   
                    reject();
                }

            });
        });


    });
}
 technology.prototype.deleteTechnologyInfo = function (technologyId) {
   
     return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                // logger.error('Error in  Database Connection');
                console.log('Error in  Database Connection');
                // logger.debug('<deleteTechnologyInfo');
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("technology").deleteOne({ _id: new ObjectId(technologyId) }, function (err, obj) {
                responseTechnology = new Object();
                if (err) {
                    // logger.error('Error in  Database Query');
                    console.log('Error in  Database Query');
                    // logger.debug('<deleteTechnologyInfo');
                    reject(err);
                }
               responseTechnology = obj.deletedCount;
                console.log(obj);
                if (obj.deletedCount == 0) {
                   // logger.debug('<deleteTechnologyInfo');
                    reject(responseTechnology);
                } else {
                   // logger.debug('<deleteTechnologyInfo');
                    fulfill(responseTechnology);
                }

            });
        });


    });
}
