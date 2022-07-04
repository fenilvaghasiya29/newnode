//var logger = require('../config/logger');
// var tagService = require('../service/tagService');
// var tagServiceObj = new tagService();

var projectService = require('../service/projectService');
var projectSerObj = new projectService();

module.exports = {

    postProject: function (request, response) {
        //console.log(request.body);
        var myObj = {
            projectName : request.body.projectName,
            projectDesc : request.body.projectDesc,
            projectType : request.body.projectType,
            projectTools : request.body.projectTools,
            projectTechnology : request.body.projectTechnology,
            projectTags : request.body.projectTags,
            projectDuration : request.body.projectDuration,
            employeeList : request.body.employeeList || [],
            contribution : []
        }
        // var projectName = request.body.projectName;
        // var desName = request.body.desName;

        projectSerObj.postProject(myObj).then(function (result) {

            response.json(result);
        }, function (err) {

            response.json(err);
        });
    },

    putProject: function (request, response) {
        //console.log(request.body);
        var projectId = request.params.id;
        //console.log(projectId);
        var myObj = {
            projectName : request.body.projectName,
            projectDesc : request.body.projectDesc,
            projectType : request.body.projectType,
            projectTools : request.body.projectTools,
            projectTechnology : request.body.projectTechnology,
            projectTags : request.body.projectTags,
            projectDuration : request.body.projectDuration,
            employeeList : request.body.employeeList
            // contribution : request.body.contribution
        }
        // var projectName = request.body.projectName;
        // var desName = request.body.desName;
console.log(myObj);
        projectSerObj.putProject(myObj, projectId).then(function (result) {
console.log(result);
            response.json(result);
        }, function (err) {

            response.json(err);
        });
    },

    putContribution: function (request, response) {
        //console.log(request.body);
        var projectId = request.params.id;
        //console.log(projectId);
        var myObj = {
          
            contribution : request.body.contribution
        }
        // var projectName = request.body.projectName;
        // var desName = request.body.desName;
console.log(myObj);
        projectSerObj.putContribution(myObj, projectId).then(function (result) {
console.log(result);
            response.json(result);
        }, function (err) {

            response.json(err);
        });
    },

    getProject : function(request,response){
        
        projectSerObj.getProject().then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    },

    deleteProject :function(request,response){
        var projectId = request.params.id;
       // var ReplaceID= request.body.replaceId;
        
      //console.log(tagId);
        projectSerObj.deleteProject(projectId).then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    }
}
