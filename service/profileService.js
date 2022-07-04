var RSVP = require('rsvp');
// var logger = require('../config/logger');
//var constant = require('../constants/constant');
var profile = require('../dao/profile');
var profileObj = new profile();

function profileService() { }
module.exports = profileService;

profileService.prototype.getProfile = function () {
    
    return new RSVP.Promise(function (fulfill, reject) {
        var responseProfile = new Object();
        profileObj.getProfileInfo().then(function (data) {
            if (data.length == 0) {
                responseProfile.success = "false";
                //responseTag.msg = constant.ERROR_DESC_MISSING_RECORD;
                reject(responseProfile);
            } else {
                responseProfile.success = "true";
                responseProfile.data = data;
                fulfill(responseProfile);
            }
        }, function (err) {
            responseProfile.success = "false";
            responseProfile.msg = err;
            
            reject(responseProfile);
        });
    });
};

profileService.prototype.getProfilebyid = function (profileId) {
    console.log("ID");
    return new RSVP.Promise(function (fulfill, reject) {
        var responseProfile = new Object();
        profileObj.getProfileInfobyid(profileId).then(function (data) {
            if (data.length == 0) {
                responseProfile.success = "false";
                //responseTag.msg = constant.ERROR_DESC_MISSING_RECORD;
                reject(responseProfile);
            } else {
                responseProfile.success = "true";
                responseProfile.data = data;
                fulfill(responseProfile);
            }
        }, function (err) {
            responseProfile.success = "false";
            responseProfile.msg = err;
            
            reject(responseProfile);
        });
    });
};

profileService.prototype.postProfile = function(myObj){
    return new RSVP.Promise(function (fulfill,reject){
        console.log(myObj);
        var responseProfile= new Object();
        // console.log(myObj);
        profileObj.postProfileInfo(myObj).then(function(data){
            if(data.length == 0){
                responseProfile.success="false";
                reject(responseProfile)
            }
            else{
                responseProfile.success="true";
                responseProfile.data={"profileId":data};
                responseProfile.msg='Added Successful'
                fulfill(responseProfile);
            }
        },
            function(err){
                responseProfile.success = "false";
                responseProfile.msg = err;
           
            reject(responseProfile);
            }
        )
    })
}

profileService.prototype.putProfile = function(myObj, profileId){
    return new RSVP.Promise(function (fulfill,reject){
        var responseProfile= new Object();
        console.log(profileId);
        profileObj.putProfileInfo(myObj, profileId).then(function(data){
            if(data.length == 0){
                responseProfile.success="false";
                reject(responseProfile)
            }
            else{
                responseProfile.success="true";
                responseProfile.data={"profileId":data};
                responseProfile.msg='Update Successful'
                fulfill(responseProfile);
            }
        },
            function(err){
                responseProfile.success = "false";
                responseProfile.msg = err;
           
            reject(responseProfile);
            }
        )
    })
}

profileService.prototype.deleteProfile = function (profileId) {
  
    return new RSVP.Promise(function (fulfill, reject) {
        var responseProfile = new Object();
     //   projectObj.getAllTechAssociateProject(tagId, "technologies").then(function (projectTech) {


            // if (!replaceID) {
            //     var indexfind;
            //     for (var i = 0; i < projectTech.length; i++) {
            //         indexfind = projectTech[i].technologies.indexOf(tagId);
            //         if (indexfind >= 0) {
            //             projectTech[i].technologies.splice(indexfind, 1);
            //         }
            //     }
            //     // for (var i = 0; i < projectTech.length; i++) {
            //     //     for (var j = 0; j < projectTech[i].technologies.length; j++) {
            //     //         if (tagId == projectTech[i].technologies[j]) {
            //     //             projectTech[i].technologies.splice(j, 1);
            //     //             j--;
            //     //         }
            //     //     }
            //     // }
            // } else {
            //     var index;
            //     for (var i = 0; i < projectTech.length; i++) {
            //         index = projectTech[i].technologies.indexOf(replaceID);
            //         for (var j = 0; j < projectTech[i].technologies.length; j++) {
            //             if (tagId == projectTech[i].technologies[j]) {
            //                 if (index < 0) {
            //                     projectTech[i].technologies[j] = replaceID;
            //                 }
            //                 else {
            //                     projectTech[i].technologies.splice(j, 1);
            //                     j--;
            //                 }

            //             }

            //         }
            //     }
            // }
            // for (var i = 0; i < projectTech.length; i++) {
            //     projectObj.updateAssociateT(projectTech[i]._id, projectTech[i].technologies, "technologies");
            // }
            // logger.debug('<deleteTag()');


        // }, function (err) {
        //     responseTag.success = "false";
        //     responseTag.msg = err;
        //     logger.debug('<deleteTag()');
        //     reject(responseTag);
        // });

        profileObj.deleteProfileInfo(profileId).then(function (data) {
            responseProfile.success = "true";
            responseProfile.msg = "Delete Successful";
           // logger.debug('<deleteTag');
            fulfill(responseProfile);
        }, function () {
            responseProfile.success = "false";
            responseProfile.msg = "Delete Unsuccessful";
           // logger.debug('<deleteTag');
            reject(responseProfile);
        });
    });
}