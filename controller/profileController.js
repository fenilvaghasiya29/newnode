//var logger = require('../config/logger');

var profileService = require('../service/profileService');
var profileSerObj = new profileService();

module.exports = {

    getProfile : function(request,response){
        
        profileSerObj.getProfile().then(function(result){
            
            response.json(result);
            console.log(result);
        },function(err){
           
            response.json(err);
        });
    },

    getProfilebyid : function(request,response){
        var profileId = request.params.id;
        console.log("ID");
        profileSerObj.getProfilebyid(profileId).then(function(result){
            console.log(profileId)
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    },

    postProfile: function (request, response) {
        console.log(request.body);
        var myObj = {
            summary: request.body.summary,
            keypoint: request.body.keypoint,
            skill : request.body.skill,
            // skill: [{
            //     skillName :request.body.skillName,
            //     skillDesc : request.body.skillDesc}],
            qualification: request.body.qualification,
                 
        }
      
        profileSerObj.postProfile(myObj).then(function (result) {

            response.json(result);
        }, function (err) {

            response.json(err);
        });
    },

    putProfile: function (request, response) {
        //console.log(request.body);
        var profileId = request.params.id;
        //console.log(projectId);
        var myObj = {
            summary: request.body.summary,
            skill: request.body.skill,
            qualification: request.body.qualification,
            keypoint: request.body.keypoint  
        }
        
        profileSerObj.putProfile(myObj, profileId).then(function (result) {

            response.json(result);
        }, function (err) {

            response.json(err);
        });
    },

   

    deleteProfile :function(request,response){
        var profileId = request.params.id;
       // var ReplaceID= request.body.replaceId;
        
      //console.log(tagId);
        profileSerObj.deleteProfile(profileId).then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    }
}