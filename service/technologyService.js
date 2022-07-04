var RSVP = require('rsvp');
// var logger = require('../config/logger');
//var constant = require('../constants/constant');
var technology = require('../dao/technology');
var technologyObj = new technology;
//var project = require('../dao/project');
//var projectObj = new project();
function technologyService() { }
module.exports = technologyService;

technologyService.prototype.getTechnology = function () {
    
    return new RSVP.Promise(function (fulfill, reject) {
        var responseTechnology = new Object();
        technologyObj.getTechnologyInfo().then(function (data) {
            if (data.length == 0) {
                responseTechnology.success = "false";
                responseTechnology.msg = constant.ERROR_DESC_MISSING_RECORD;
                
                reject(responseTechnology);
            } else {
                responseTechnology.success = "true";
                responseTechnology.data = data;
                
                fulfill(responseTechnology);
            }
        }, function (err) {
            responseTechnology.success = "false";
            responseTechnology.msg = err;
            
            reject(responseTechnology);
        });
    });
};
technologyService.prototype.postTechnology = function (technologyName) {
  
    return new RSVP.Promise(function (fulfill, reject) {
        var responseTechnology = new Object();
        technologyObj.postTechnologyInfo(technologyName).then(function (data) {
            if (data.length == 0) {
                responseTechnology.success = "false";
                responseTechnology.msg = constant.ERROR_DESC_INVALID_VALUE;
               
                reject(responseTechnology);
            } else {
                responseTechnology.success = "true";
                responseTechnology.data = { "technologyId": data };
                responseTechnology.msg = "Added Successful";
               
                fulfill(responseTechnology);
            }
        }, function (err) {
            responseTechnology.success = "false";
            responseTechnology.msg = err;
           
            reject(responseTechnology);
        });
    });
};
technologyService.prototype.putTechnology = function (technologyId, technologyName) {
    
    return new RSVP.Promise(function (fulfill, reject) {
        var responseTechnology = new Object();
        technologyObj.putTechnologyInfo(technologyId, technologyName).then(function (data) {
            responseTechnology.success = "true";
            responseTechnology.data = { "technologyId": data };
            responseTechnology.msg = "Update Successful";
            
            fulfill(responseTechnology);
        }, function () {
            responseTechnology.success = "false";
            responseTechnology.msg = constant.ERROR_DESC_MISSING_RECORD;
         
            reject(responseTechnology);
        });
    });
};


technologyService.prototype.deleteTechnology = function (technologyId) {
  //  logger.debug('>deleteTechnology()  in Service');
    return new RSVP.Promise(function (fulfill, reject) {
        var responseTechnology = new Object();
     //   projectObj.getAllTechAssociateProject(technologyId, "technologies").then(function (projectTech) {


            // if (!replaceID) {
            //     var indexfind;
            //     for (var i = 0; i < projectTech.length; i++) {
            //         indexfind = projectTech[i].technologies.indexOf(technologyId);
            //         if (indexfind >= 0) {
            //             projectTech[i].technologies.splice(indexfind, 1);
            //         }
            //     }
            //     // for (var i = 0; i < projectTech.length; i++) {
            //     //     for (var j = 0; j < projectTech[i].technologies.length; j++) {
            //     //         if (technologyId == projectTech[i].technologies[j]) {
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
            //             if (technologyId == projectTech[i].technologies[j]) {
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
            // logger.debug('<deleteTechnology()');


        // }, function (err) {
        //     responseTechnology.success = "false";
        //     responseTechnology.msg = err;
        //     logger.debug('<deleteTechnology()');
        //     reject(responseTechnology);
        // });

        technologyObj.deleteTechnologyInfo(technologyId).then(function (data) {
            responseTechnology.success = "true";
            responseTechnology.msg = "Delete Successful";
           // logger.debug('<deleteTechnology');
            fulfill(responseTechnology);
        }, function () {
            responseTechnology.success = "false";
            responseTechnology.msg = "Delete Unsuccessful";
           // logger.debug('<deleteTechnology');
            reject(responseTechnology);
        });
    });
}

