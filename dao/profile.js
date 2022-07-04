var RSVP = require('rsvp');
///var logger = require('../config/logger');
var mongoClient = require('mongodb').MongoClient;
//var auth = require('../config/auth');
ObjectId = require('mongodb').ObjectID;


function profile() { }
module.exports= profile;

profile.prototype.getProfileInfo = function () {

        return new RSVP.Promise(function (fulfill, reject) {

            mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
                if (err) {
                    console.log('Error in  Database Connection');
                
                    reject(err);
                }
                var dbs = db.db('Profile');
                dbs.collection("profile").find({}).toArray(function (err, result) {
                    responseProfile = new Object();
                    if (err) {
                        console.log('Error in  Database Query');
                        
                        reject(err);
                    }
                    
                    responseProfile = result;
                    
                    fulfill(responseProfile);
                });
            });


        });
    }

    profile.prototype.getProfileInfobyid = function (profileId) {
        console.log("ID");
        return new RSVP.Promise(function (fulfill, reject) {

            mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
                if (err) {
                    console.log('Error in  Database Connection');
                
                    reject(err);
                }
                var dbs = db.db('Profile');
                dbs.collection("profile").find({ _id: new ObjectId(profileId) }).toArray(function (err, result) {
                    responseProfile = new Object();
                    if (err) {
                        console.log('Error in  Database Query');
                        
                        reject(err);
                    }
                    
                    responseProfile = result;
                    //console.log(responseProfile);
                    fulfill(responseProfile);
                });
            });


        });
    }



profile.prototype.postProfileInfo = function(myObj){
    return new RSVP.Promise(function(fulfill, reject){
        //console.log(myObj);
        mongoClient.connect('mongodb://localhost:27017/',function(err,db){
            if(err){
                console.log('Error in  Database Connection');
                reject(err);
            }
            var dbs = db.db('Profile');
            profileObj = myObj;
            dbs.collection('profile').insertOne(profileObj,function(err,result){
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                dbs.collection('profile').find(myObj).toArray(function (err,result){
                    if (err) {
                        console.log('Error in  Database Query');
                        
                        reject(err);
                    }
                    responseProfile = new Object();
                    responseProfile = result;
                    
                    fulfill(responseProfile);
                })

            })
        })
    })
}
    profile.prototype.putProfileInfo = function(myObj, profileId){
        return new RSVP.Promise(function(fulfill, reject){
            console.log(myObj);
            console.log(profileId);
            mongoClient.connect('mongodb://localhost:27017/',function(err,db){
                if(err){
                    console.log('Error in  Database Connection');
                    reject(err);
                }
                var dbs = db.db('Profile');
                console.log(profileId);
                var oldValues = { _id: new ObjectId(profileId) };
                var newValues = { $set: {summary : myObj.summary,
                                         skill : myObj.skill,
                                         qualification : myObj.qualification,
                                         keypoint : myObj.keypoint
                                         }}
        
                dbs.collection("profile").updateOne(oldValues, newValues, function (err, result) {
                    if (err) {
                         console.log('Error in  Database Query');
                         reject(err);
                        }
                        if (result.modifiedCount == 1 && result.matchedCount == 1) {
                            responseUser = new Object();
                            responseUser = profileId;
                            fulfill(responseUser);
                        } else {
                            reject();
                        }
                    });
            })
        })
    }

    
    profile.prototype.deleteProfileInfo = function (profileId) {
    
        return new RSVP.Promise(function (fulfill, reject) {

           mongoClient.connect('mongodb://localhost:27017', function (err, db) {
               if (err) {
                   // logger.error('Error in  Database Connection');
                   console.log('Error in  Database Connection');
                   // logger.debug('<deleteTagInfo');
                   reject(err);
               }
               var dbs = db.db('Profile');
               dbs.collection("profile").deleteOne({ _id: new ObjectId(profileId) }, function (err, obj) {
                   responseProfile = new Object();
                   if (err) {
                       // logger.error('Error in  Database Query');
                       console.log('Error in  Database Query');
                       // logger.debug('<deleteTagInfo');
                       reject(err);
                   }
                  responseProfile = obj.deletedCount;
                   console.log(obj);
                   if (obj.deletedCount == 0) {
                      // logger.debug('<deleteTagInfo');
                       reject(responseProfile);
                   } else {
                      // logger.debug('<deleteTagInfo');
                       fulfill(responseProfile);
                   }

               });
           });


       });
    }