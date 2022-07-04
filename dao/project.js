var RSVP = require('rsvp');
///var logger = require('../config/logger');
var mongoClient = require('mongodb').MongoClient;
//var auth = require('../config/auth');
ObjectId = require('mongodb').ObjectID;


function project() { }
module.exports= project;

project.prototype.postProjectInfo = function(myObj){
    return new RSVP.Promise(function(fulfill, reject){
      //  console.log(myObj);
        mongoClient.connect('mongodb://localhost:27017/',function(err,db){
            if(err){
                console.log('Error in  Database Connection');
                reject(err);
            }
            var dbs = db.db('CRB');
            projectObj = myObj;
            // projectObj = {projectName:myObj.projectName, 
            //     projectDesc: myObj.projectDesc, 
            //     projectTools:myObj.projectTools, 
            //     projectTechnology:myObj.projectTechnology,
            //     projectTags : myObj.projectTags,
            //     projectDuration : myObj.projectDuration }
            dbs.collection('project').insertOne(projectObj,function(err,result){
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                dbs.collection('project').find(myObj).toArray(function (err,result){
                    if (err) {
                        console.log('Error in  Database Query');
                        
                        reject(err);
                    }
                    responseProject = new Object();
                    responseProject = result;
                    
                    fulfill(responseProject);
                })

            })
        })
    })
}
project.prototype.putProjectInfo = function(myObj, projectId){
    return new RSVP.Promise(function(fulfill, reject){
      //  console.log(myObj);
   
        //console.log(projectId);
        mongoClient.connect('mongodb://localhost:27017/',function(err,db){
            if(err){
                console.log('Error in  Database Connection');
                reject(err);
            }
            var dbs = db.db('CRB');
          //  console.log(projectId);
            var oldValues = { _id: new ObjectId(projectId) };
            var newValues = { $set: {projectName : myObj.projectName,
                                     projectDesc : myObj.projectDesc,
                                     projectType : myObj.projectType,
                                     projectTools : myObj.projectTools,
                                     projectTechnology : myObj.projectTechnology,
                                     projectTags : myObj.projectTags,
                                     projectDuration : myObj.projectDuration,
                                     employeeList : myObj.employeeList,
                                    // contribution : myObj.contribution
                                }}
    
            dbs.collection("project").updateOne(oldValues, newValues, function (err, result) {
                if (err) {
                     console.log('Error in  Database Query');
                     reject(err);
                    }
                    if (result.modifiedCount == 1 && result.matchedCount == 1) {
                        responseProject = new Object();
                        responseProject ={projectId,myObj} ;
                      
                        fulfill(responseProject);
                    } else {
                        reject();
                    }
                });
        })
    })
}

project.prototype.putContributionInfo = function(myObj, projectId){
    return new RSVP.Promise(function(fulfill, reject){
      //  console.log(myObj);
   
        //console.log(projectId);
        mongoClient.connect('mongodb://localhost:27017/',function(err,db){
            if(err){
                console.log('Error in  Database Connection');
                reject(err);
            }
            var dbs = db.db('CRB');
          //  console.log(projectId);
            var oldValues = { _id: new ObjectId(projectId) };
            var newValues = { $set: {
                                    // projectName : myObj.projectName,
                                    //  projectDesc : myObj.projectDesc,
                                    //  projectType : myObj.projectType,
                                    //  projectTools : myObj.projectTools,
                                    //  projectTechnology : myObj.projectTechnology,
                                    //  projectTags : myObj.projectTags,
                                    //  projectDuration : myObj.projectDuration,
                                    //  employeeList : myObj.employeeList,
                                    contribution : myObj.contribution
                                }}
    
            dbs.collection("project").updateOne(oldValues, newValues, function (err, result) {
                if (err) {
                     console.log('Error in  Database Query');
                     reject(err);
                    }
                    if (result.modifiedCount == 1 && result.matchedCount == 1) {
                        responseProject = new Object();
                        responseProject ={projectId,myObj} ;
                      
                        fulfill(responseProject);
                    } else {
                        reject();
                    }
                });
        })
    })
}

project.prototype.getProjectInfo = function () {

    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');
               
                reject(err);
            }
            var dbs = db.db('CRB');
            dbs.collection("project").find({}).toArray(function (err, result) {
                responseProject = new Object();
                if (err) {
                    console.log('Error in  Database Query');
                    
                    reject(err);
                }
                
                responseProject = result;
                
                fulfill(responseProject);
            });
        });


    });
}

project.prototype.deleteProjectInfo = function (projectId) {
   
    return new RSVP.Promise(function (fulfill, reject) {

       mongoClient.connect('mongodb://localhost:27017', function (err, db) {
           if (err) {
               // logger.error('Error in  Database Connection');
               console.log('Error in  Database Connection');
               // logger.debug('<deleteTagInfo');
               reject(err);
           }
           var dbs = db.db('CRB');
           dbs.collection("project").deleteOne({ _id: new ObjectId(projectId) }, function (err, obj) {
               responseProject = new Object();
               if (err) {
                   // logger.error('Error in  Database Query');
                   console.log('Error in  Database Query');
                   // logger.debug('<deleteTagInfo');
                   reject(err);
               }
              responseProject = obj.deletedCount;
              // console.log(obj);
               if (obj.deletedCount == 0) {
                  // logger.debug('<deleteTagInfo');
                   reject(responseProject);
               } else {
                  // logger.debug('<deleteTagInfo');
                   fulfill(responseProject);
               }

           });
       });


   });
}

// tag.prototype.postTagInfo = function (tagName) {
//     return new RSVP.Promise(function (fulfill, reject) {
//         mongoClient.connect('mongodb://localhost:27017', function (err, db) {
//             if (err) {
//                 console.log('Error in  Database Connection');
                
//                 reject(err);
//             }
//             var dbs = db.db('Tags');
//             dbs.collection("tag").insertOne({ tagName: tagName }, function (err, result) {

//                 if (err) {
//                     console.log('Error in  Database Query');
                    
//                     reject(err);
//                 }
//                 dbs.collection("tag").find({ tagName: tagName }).toArray(function (err, result) {
//                     if (err) {
//                         console.log('Error in  Database Query');
                        
//                         reject(err);
//                     }
//                     responseTag = new Object();
//                     responseTag = result;
                    
//                     fulfill(responseTag);
//                 });

//             });
//         });


//     });
// }
// tag.prototype.putTagInfo = function (tagId, tagName) {
    
//     return new RSVP.Promise(function (fulfill, reject) {

//         mongoClient.connect('mongodb://localhost:27017', function (err, db) {
//             if (err) {
//                 console.log('Error in  Database Connection');
             
//                 reject(err);
//             }
//             var dbs = db.db('Tags');
//             var oldValues = { _id: new ObjectId(tagId) };
//             var newValues = { $set: { tagName: tagName } };
//             dbs.collection("tag").updateOne(oldValues, newValues, function (err, result) {
//                 if (err) {
//                     console.log('Error in  Database Query');
                    
//                     reject(err);
//                 }
//                 console.log(tagId);
//                 if (result.modifiedCount == 1 && result.matchedCount == 1) {
//                     responseTag = new Object();
//                     _id=tagId;
//                     console.log(_id);
//                     responseTag = {_id,tagName};
                    
//                     fulfill(responseTag);
//                 } else {
                   
//                     reject();
//                 }

//             });
//         });


//     });
// }
//  tag.prototype.deleteTagInfo = function (tagId) {
   
//      return new RSVP.Promise(function (fulfill, reject) {

//         mongoClient.connect('mongodb://localhost:27017', function (err, db) {
//             if (err) {
//                 // logger.error('Error in  Database Connection');
//                 console.log('Error in  Database Connection');
//                 // logger.debug('<deleteTagInfo');
//                 reject(err);
//             }
//             var dbs = db.db('Tags');
//             dbs.collection("tag").deleteOne({ _id: new ObjectId(tagId) }, function (err, obj) {
//                 responseTag = new Object();
//                 if (err) {
//                     // logger.error('Error in  Database Query');
//                     console.log('Error in  Database Query');
//                     // logger.debug('<deleteTagInfo');
//                     reject(err);
//                 }
//                responseTag = obj.deletedCount;
//                 console.log(obj);
//                 if (obj.deletedCount == 0) {
//                    // logger.debug('<deleteTagInfo');
//                     reject(responseTag);
//                 } else {
//                    // logger.debug('<deleteTagInfo');
//                     fulfill(responseTag);
//                 }

//             });
//         });


//     });
// }