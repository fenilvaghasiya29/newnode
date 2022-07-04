var RSVP = require('rsvp');
///var logger = require('../config/logger');
var mongoClient = require('mongodb').MongoClient;
//var auth = require('../config/auth');
ObjectId = require('mongodb').ObjectID;


function tool() { }
module.exports = tool;

tool.prototype.getToolInfo = function () {

    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
               
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("tool").find({}).toArray(function (err, result) {
                responseTool = new Object();
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                
                responseTool = result;
                
                fulfill(responseTool);
            });
        });


    });
}

tool.prototype.postToolInfo = function (toolName) {
    
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
                
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("tool").insertOne({ toolName: toolName }, function (err, result) {

                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                dbs.collection("tool").find({ toolName: toolName }).toArray(function (err, result) {
                    if (err) {
                        console.log('Error in  Database Query');
                        
                        reject(err);
                    }
                    responseTool = new Object();
                    responseTool = result;
                    
                    fulfill(responseTool);
                });

            });
        });


    });
}
tool.prototype.putToolInfo = function (toolId, toolName) {
    
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
             
                reject(err);
            }
            var dbs = db.db('CRB');
            var oldValues = { _id: new ObjectId(toolId) };
            var newValues = { $set: { toolName: toolName } };
            dbs.collection("tool").updateOne(oldValues, newValues, function (err, result) {
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                console.log(toolId);
                if (result.modifiedCount == 1 && result.matchedCount == 1) {
                    responseTool = new Object();
                    _id=toolId;
                    console.log(_id);
                    responseTool = {_id,toolName};
                    
                    fulfill(responseTool);
                } else {
                   
                    reject();
                }

            });
        });


    });
}
 tool.prototype.deleteToolInfo = function (toolId) {
   
     return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017', function (err, db) {
            if (err) {
                // logger.error('Error in  Database Connection');
                console.log('Error in  Database Connection');
                // logger.debug('<deleteToolInfo');
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("tool").deleteOne({ _id: new ObjectId(toolId) }, function (err, obj) {
                responseTool = new Object();
                if (err) {
                    // logger.error('Error in  Database Query');
                    console.log('Error in  Database Query');
                    // logger.debug('<deleteToolInfo');
                    reject(err);
                }
               responseTool = obj.deletedCount;
                console.log(obj);
                if (obj.deletedCount == 0) {
                   // logger.debug('<deleteToolInfo');
                    reject(responseTool);
                } else {
                   // logger.debug('<deleteToolInfo');
                    fulfill(responseTool);
                }

            });
        });


    });
}
