var RSVP = require('rsvp');
var mongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;


function user() { }
module.exports = user;
url = "mongodb://localhost:27017/";

user.prototype.getUserInfo = function () {
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("user").find({}).toArray(function (err, result) {
                resp = new Object();
                if (err) {
                    console.log('Error in  Database Query');
                    reject(err);
                }
                responseUser = result;
                fulfill(responseUser);
            });
        });

    });
}

user.prototype.getUserInfobyid = function (userId) {
    
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
            
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("user").find({ _id: new ObjectId(userId) }).toArray(function (err, result) {
                responseUser = new Object();
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                
                responseUser = result;
                
                fulfill(responseUser);
            });
        });


    });
}

user.prototype.putUserInfo = function (userId, myObj) {
    return new RSVP.Promise(function (fulfill, reject) {
        
      mongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
                reject(err);
            }
            var dbs = db.db("CRB");
            var oldValues = { _id: new ObjectId(userId) };
            var newValues = { $set: { 
                userRole : myObj.userRole,
                status : myObj.status,
                summary : myObj.summary,
                skill : myObj.skill,
                qualification : myObj.qualification,
                keypoint : myObj.keypoint } };
               
            dbs.collection("user").updateOne(oldValues, newValues, function (err, result) {
                if (err) {
                    console.log('Error in  Database Query');
                    reject(err);
                }
                
                if (result.modifiedCount == 1 && result.matchedCount == 1) {
                    responseUser = new Object();
                    responseUser = userId;
                    fulfill(responseUser);
                } else {
                    reject();
                }
            });
        });
    });
},
user.prototype.postUserLogin = function (myObj) {
    var userName = myObj.userName;
    var userRole = myObj.userRole;
    var password = myObj.password;
    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
            
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("user").findOne({ userName:userName },function (err, result) {
                // console.log(result);
                responseUser = new Object();
                if (!result) {
                    
                    console.log("invalid User Name");
                   
                    reject("invalid User Name");
                       
                   
                }
                if(result){
                    // if (userRole==""||result.userRole !== userRole) {
                    //     console.log("invalid role");
                       
                    //     reject("invalid role");
                    // }
                    if (result.password !== password) {
                        console.log("invalid Password");
                        reject("invalid Password");
                    }else if(result.status !== "active"){
                        console.log("User Inactive");
                        reject("User Inactive");
                    }
                    else 
                   
                    responseUser = {userName : result.userName,
                        userRole : result.userRole,
                        userId : result._id};
                }
                // if (result.userRole==""||result.userRole !== userRole) {
                //     console.log("invalide role");
                //     reject(err);
                // }
                // if (result.password !== password) {
                //     console.log("invalide Password");
                //     reject(err);
                // }
                
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                
                
                console.log(responseUser);
                fulfill(responseUser);
            });
        });


    });
}
