var RSVP = require('rsvp');
// var logger = require('../config/logger');
//var constant = require('../constants/constant');
var tool = require('../dao/tool');
var toolObj = new tool;
//var project = require('../dao/project');
//var projectObj = new project();
function toolService() { }
module.exports = toolService;

toolService.prototype.getTool = function () {
    
    return new RSVP.Promise(function (fulfill, reject) {
        var responseTool = new Object();
        toolObj.getToolInfo().then(function (data) {
            if (data.length == 0) {
                responseTool.success = "false";
                responseTool.msg = constant.ERROR_DESC_MISSING_RECORD;
                
                reject(responseTool);
            } else {
                responseTool.success = "true";
                responseTool.data = data;
                
                fulfill(responseTool);
            }
        }, function (err) {
            responseTool.success = "false";
            responseTool.msg = err;
            
            reject(responseTool);
        });
    });
};
toolService.prototype.postTool = function (toolName) {
  
    return new RSVP.Promise(function (fulfill, reject) {
        var responseTool = new Object();
        toolObj.postToolInfo(toolName).then(function (data) {
            if (data.length == 0) {
                responseTool.success = "false";
                responseTool.msg = constant.ERROR_DESC_INVALID_VALUE;
               
                reject(responseTool);
            } else {
                responseTool.success = "true";
                responseTool.data = { "toolId": data };
                responseTool.msg = "Added Successful";
               
                fulfill(responseTool);
            }
        }, function (err) {
            responseTool.success = "false";
            responseTool.msg = err;
           
            reject(responseTool);
        });
    });
};
toolService.prototype.putTool = function (toolId, toolName) {
    
    return new RSVP.Promise(function (fulfill, reject) {
        var responseTool = new Object();
        toolObj.putToolInfo(toolId, toolName).then(function (data) {
            responseTool.success = "true";
            responseTool.data = { "toolId": data };
            responseTool.msg = "Update Successful";
            
            fulfill(responseTool);
        }, function () {
            responseTool.success = "false";
            responseTool.msg = constant.ERROR_DESC_MISSING_RECORD;
         
            reject(responseTool);
        });
    });
};


toolService.prototype.deleteTool = function (toolId) {
  //  logger.debug('>deleteTool()  in Service');
    return new RSVP.Promise(function (fulfill, reject) {
        var responseTool = new Object();
     //   projectObj.getAllTechAssociateProject(toolId, "technologies").then(function (projectTech) {


            // if (!replaceID) {
            //     var indexfind;
            //     for (var i = 0; i < projectTech.length; i++) {
            //         indexfind = projectTech[i].technologies.indexOf(toolId);
            //         if (indexfind >= 0) {
            //             projectTech[i].technologies.splice(indexfind, 1);
            //         }
            //     }
            //     // for (var i = 0; i < projectTech.length; i++) {
            //     //     for (var j = 0; j < projectTech[i].technologies.length; j++) {
            //     //         if (toolId == projectTech[i].technologies[j]) {
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
            //             if (toolId == projectTech[i].technologies[j]) {
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
            // logger.debug('<deleteTool()');


        // }, function (err) {
        //     responseTool.success = "false";
        //     responseTool.msg = err;
        //     logger.debug('<deleteTool()');
        //     reject(responseTool);
        // });

        toolObj.deleteToolInfo(toolId).then(function (data) {
            responseTool.success = "true";
            responseTool.msg = "Delete Successful";
           // logger.debug('<deleteTool');
            fulfill(responseTool);
        }, function () {
            responseTool.success = "false";
            responseTool.msg = "Delete Unsuccessful";
           // logger.debug('<deleteTool');
            reject(responseTool);
        });
    });
}

