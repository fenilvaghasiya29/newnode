var RSVP = require('rsvp');
// var logger = require('../config/logger');
//var constant = require('../constants/constant');
//var tag = require('../dao/tag');
//var tagObj = new tag;

var project = require('../dao/project');

var projectObj=  new project();

function projectService() { }
module.exports = projectService;

projectService.prototype.postProject = function(myObj){
    return new RSVP.Promise(function (fulfill,reject){
        var responseProject= new Object();
        // console.log(myObj);
        projectObj.postProjectInfo(myObj).then(function(data){
            if(data.length == 0){
                responseProject.success="false";
                reject(responseProject)
            }
            else{
                responseProject.success="true";
                responseProject.data={"projectId":data};
                responseProject.msg='Added Successful'
                fulfill(responseProject);
            }
        },
            function(err){
                responseProject.success = "false";
            responseProject.msg = err;
           
            reject(responseProject);
            }
        )
    })
}

projectService.prototype.putProject = function(myObj, projectId){
    return new RSVP.Promise(function (fulfill,reject){
        var responseProject= new Object();
        console.log(projectId);
        projectObj.putProjectInfo(myObj, projectId).then(function(data){
            if(data.length == 0){
                responseProject.success="false";
                reject(responseProject)
            }
            else{
                responseProject.success="true";
                responseProject.data={"projectId":data};
                responseProject.msg='Update Successful'
                fulfill(responseProject);
            }
        },
            function(err){
                responseProject.success = "false";
            responseProject.msg = err;
           
            reject(responseProject);
            }
        )
    })
}

projectService.prototype.putContribution = function(myObj, projectId){
    return new RSVP.Promise(function (fulfill,reject){
        var responseProject= new Object();
        console.log(projectId);
        projectObj.putContributionInfo(myObj, projectId).then(function(data){
            if(data.length == 0){
                responseProject.success="false";
                reject(responseProject)
            }
            else{
                responseProject.success="true";
                responseProject.data={"projectId":data};
                responseProject.msg='Update Successful'
                fulfill(responseProject);
            }
        },
            function(err){
                responseProject.success = "false";
            responseProject.msg = err;
           
            reject(responseProject);
            }
        )
    })
}

projectService.prototype.getProject = function () {
    
    return new RSVP.Promise(function (fulfill, reject) {
        var responseProject = new Object();
        projectObj.getProjectInfo().then(function (data) {
            if (data.length == 0) {
                responseProject.success = "false";
                //responseTag.msg = constant.ERROR_DESC_MISSING_RECORD;
                
                reject(responseProject);
            } else {
                responseProject.success = "true";
                responseProject.data = data;
                
                fulfill(responseProject);
            }
        }, function (err) {
            responseProject.success = "false";
            responseProject.msg = err;
            
            reject(responseProject);
        });
    });
};

projectService.prototype.deleteProject = function (projectId) {
  
    return new RSVP.Promise(function (fulfill, reject) {
        var responseProject = new Object();
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

        projectObj.deleteProjectInfo(projectId).then(function (data) {
            responseProject.success = "true";
            responseProject.msg = "Delete Successful";
           // logger.debug('<deleteTag');
            fulfill(responseProject);
        }, function () {
            responseProject.success = "false";
            responseProject.msg = "Delete Unsuccessful";
           // logger.debug('<deleteTag');
            reject(responseProject);
        });
    });
}
// tagService.prototype.postTag = function (tagName) {
  
//     return new RSVP.Promise(function (fulfill, reject) {
//         var responseTag = new Object();
//         tagObj.postTagInfo(tagName).then(function (data) {
//             if (data.length == 0) {
//                 responseTag.success = "false";
//                 responseTag.msg = constant.ERROR_DESC_INVALID_VALUE;
               
//                 reject(responseTag);
//             } else {
//                 responseTag.success = "true";
//                 responseTag.data = { "tagId": data };
//                 responseTag.msg = "Added Successful";
               
//                 fulfill(responseTag);
//             }
//         }, function (err) {
//             responseTag.success = "false";
//             responseTag.msg = err;
           
//             reject(responseTag);
//         });
//     });
// };
// tagService.prototype.putTag = function (tagId, tagName) {
    
//     return new RSVP.Promise(function (fulfill, reject) {
//         var responseTag = new Object();
//         tagObj.putTagInfo(tagId, tagName).then(function (data) {
//             responseTag.success = "true";
//             responseTag.data = { "tagId": data };
//             responseTag.msg = "Update Successful";
            
//             fulfill(responseTag);
//         }, function () {
//             responseTag.success = "false";
//             responseTag.msg = constant.ERROR_DESC_MISSING_RECORD;
         
//             reject(responseTag);
//         });
//     });
// };


// tagService.prototype.deleteTag = function (tagId) {
//   //  logger.debug('>deleteTag()  in Service');
//     return new RSVP.Promise(function (fulfill, reject) {
//         var responseTag = new Object();
//      //   projectObj.getAllTechAssociateProject(tagId, "technologies").then(function (projectTech) {


//             // if (!replaceID) {
//             //     var indexfind;
//             //     for (var i = 0; i < projectTech.length; i++) {
//             //         indexfind = projectTech[i].technologies.indexOf(tagId);
//             //         if (indexfind >= 0) {
//             //             projectTech[i].technologies.splice(indexfind, 1);
//             //         }
//             //     }
//             //     // for (var i = 0; i < projectTech.length; i++) {
//             //     //     for (var j = 0; j < projectTech[i].technologies.length; j++) {
//             //     //         if (tagId == projectTech[i].technologies[j]) {
//             //     //             projectTech[i].technologies.splice(j, 1);
//             //     //             j--;
//             //     //         }
//             //     //     }
//             //     // }
//             // } else {
//             //     var index;
//             //     for (var i = 0; i < projectTech.length; i++) {
//             //         index = projectTech[i].technologies.indexOf(replaceID);
//             //         for (var j = 0; j < projectTech[i].technologies.length; j++) {
//             //             if (tagId == projectTech[i].technologies[j]) {
//             //                 if (index < 0) {
//             //                     projectTech[i].technologies[j] = replaceID;
//             //                 }
//             //                 else {
//             //                     projectTech[i].technologies.splice(j, 1);
//             //                     j--;
//             //                 }

//             //             }

//             //         }
//             //     }
//             // }
//             // for (var i = 0; i < projectTech.length; i++) {
//             //     projectObj.updateAssociateT(projectTech[i]._id, projectTech[i].technologies, "technologies");
//             // }
//             // logger.debug('<deleteTag()');


//         // }, function (err) {
//         //     responseTag.success = "false";
//         //     responseTag.msg = err;
//         //     logger.debug('<deleteTag()');
//         //     reject(responseTag);
//         // });

//         tagObj.deleteTagInfo(tagId).then(function (data) {
//             responseTag.success = "true";
//             responseTag.msg = "Delete Successful";
//            // logger.debug('<deleteTag');
//             fulfill(responseTag);
//         }, function () {
//             responseTag.success = "false";
//             responseTag.msg = "Delete Unsuccessful";
//            // logger.debug('<deleteTag');
//             reject(responseTag);
//         });
//     });
// }