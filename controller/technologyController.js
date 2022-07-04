//var logger = require('../config/logger');
var technologyService = require('../service/technologyService');
var technologyServiceObj = new technologyService();

module.exports = {
    getTechnology : function(request,response){
        
        technologyServiceObj.getTechnology().then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    },
    postTechnology :function(request,response){
        var technologyName = request.body.technologyName;
       console.log(technologyName);
        technologyServiceObj.postTechnology(technologyName).then(function(result){
       
            response.json(result);
        },function(err){
            
            response.json(err);
        });
    },
  
    putTechnology :function(request,response){
        var technologyId = request.params.id ||request.body.technologyId;
  //      var technologyId = request.body.technologyId;
        var technologyName = request.body.technologyName;
      technologyServiceObj.putTechnology(technologyId,technologyName).then(function(result){
           
            response.json(result);
        },function(err){
            
            response.json(err);
        });
    },
    deleteTechnology :function(request,response){
        var technologyId = request.params.id;
       // var ReplaceID= request.body.replaceId;
        
      //console.log(technologyId);
        technologyServiceObj.deleteTechnology(technologyId).then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    } 
}
