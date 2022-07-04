
var RSVP = require('rsvp');
var mongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var async = require('async');
var path = require('path');
const { platform, userInfo } = require('os');
const { download } = require('express/lib/response');

function resume() { }
module.exports = resume;
url = "mongodb://localhost:27017/";

// getUserResumeInfo = function (userId, userName) {

//     return new RSVP.Promise(function (fulfill, reject) {

//         mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
//             if (err) {
//                 console.log('Error in  Database Connection');

//                 reject(err);
//             }
//             var dbs = db.db('CRB');
//             dbs.collection("user").find({ _id: new ObjectId(userId) }).toArray(function (err, result) {
//                 responseUser = new Object();
//                 if (err) {
//                     console.log('Error in  Database Query');

//                     reject(err);
//                 }

//                 responseUser = result;
//                 // console.log(responseUser);
//                 fulfill(responseUser);
//             });
//         });
//     });
// }

resume.prototype.getprojectInfo = function (userObj) {
    // console.log(userObj);
    userId = userObj.userId;
    userName = userObj.userName;

    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');

                reject(err);
            }
            var dbs = db.db('CRB');
            //dbs.collection("project").find({},{ projection: { _id: 0, employeeList : 1 } }).toArray(function (err, result) {
            //dbs.collection("project").find({employeeList : {_id : userId}}).toArray(function (err, result) {
            dbs.collection("project").find({ employeeList: { $elemMatch: { _id: userId } } } && {contribution:{$elemMatch : {userid : userId}}}).toArray(function (err, result) {
                // console.log(result);
                responseUser = new Object();
                if (err) {
                    console.log('Error in  Database Query');
                    reject(err);
                }
                if (result.length > 0) {
                    responseUser = result;

                } else {
                    reject(responseUser);
                }
                fulfill(responseUser);
            });

        });
    });
}

// resume.prototype.download = function () {
//     // console.log(userObj);
//     return new RSVP.Promise(function (fulfill, reject) {
//     });
// }

// download Resume 
resume.prototype.downloadResume = function (userObj) {
//    console.log(userObj)
    userId = userObj.userId;
    userName = userObj.userName;
    randomNumber = userObj.randomNumber;

    return new RSVP.Promise(function (fulfill, reject) {

        mongoClient.connect('mongodb://localhost:27017/', function (err, db) {
            if (err) {
                console.log('Error in  Database Connection');

                reject(err);
            }
            var dbs = db.db('CRB');
           
            dbs.collection("project").find({ employeeList: { $elemMatch: { _id: userId } } } && {contribution:{$elemMatch : {userid : userId}}}).toArray(function (err, result) {
                // responseUser = new Object();
                if (err) {
                    console.log('Error in  Database Query');
                    reject(err);
                }
                
                var myObj = new Object();
                // console.log(result);

                // const val = Math.floor(10 * Math.random() * 9000);
                // console.log(val);

                if (result.length <= 0) {
                    // responseUser = result;
                    // console.log(myObj);
                    myObj = {
                        userName: userName||{},
                        summary: userObj.summary||{},
                        skill : userObj.skill||{},
                        keypoint: userObj.keypoint||{},
                        qualification: userObj.qualification||{},
                        // project: result,
                    }
                   
                } else {
                    myObj = {
                        userName: userName||{},
                        summary: userObj.summary||{},
                        skill : userObj.skill||{},
                        keypoint: userObj.keypoint||{},
                        qualification: userObj.qualification||{},
                        project: result||{},
                    }
                }
                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }
                function errorHandler(error) {
                    console.log(JSON.stringify({ error: error }, replaceErrors));
        
                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors.map(function (error) {
                            return error.properties.explanation;
                        }).join("\n");
                        console.log('errorMessages', errorMessages);
                    }
                    throw error;
                }
        
                //Load the docx file as a binary
                var content = fs
                    .readFileSync(path.resolve(__dirname, 'G:/cspit/sem8/profilbuilder/backendpp/Resume_Template_1.docx'), 'binary');
        
                var zip = new PizZip(content);
                var doc;
                try {
                    doc = new Docxtemplater(zip);
                } catch (error) {
                    errorHandler(error);
                }
                // console.log(zip);
                // console.log(myObj.contribution);
                async.series([
                    function(callback) {
                        doc.setData({
                            userName: myObj.userName,
                            summaryDescription: myObj.summary,
                            summaryPoints: myObj.keypoint,
                            skillTable : myObj.skill,
                            skillName: myObj.skill.skillName,
                            skillDesc: myObj.skill.skillDesc,
                            Qualification: myObj.qualification,
                            project : myObj.project,                   
                        })
                        try {
                            doc.render()
                        }
                        catch (error) {
                            errorHandler(error);
                        }
                        var buf = doc.getZip().generate({ type: 'nodebuffer' });
                        //  fs.writeFileSync(path.resolve('public/resume/', + val +'.' + userName + '.docx'), buf);
                        console.log('Generating word file: ', myObj.userName);
                        //  console.log(userName);
                        fs.writeFileSync(__dirname + '/../GeneratedResume/' + myObj.userName + randomNumber + '.docx', buf);
                        callback(myObj.userName)
                    },
                ], function(userName){
                    // console.log(userName);
                    fulfill(userName);
                });
            }, function(myObj){
                reject(myObj);
            });
        }, function(err) {
            myObj['success'] = "false";
            myObj['msg'] = err;
            reject(myObj);
        });
    });
}