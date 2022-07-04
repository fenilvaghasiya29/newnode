//var logger = require('../config/logger');
var toolService = require('../service/toolService');
var toolServiceObj = new toolService();

module.exports = {
    getTool : function(request,response){
        
        toolServiceObj.getTool().then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    },
    postTool :function(request,response){
        var toolName = request.body.toolName;
       
        toolServiceObj.postTool(toolName).then(function(result){
       
            response.json(result);
        },function(err){
            
            response.json(err);
        });
    },
  
    putTool :function(request,response){
        var toolId = request.params.id ||request.body.toolId;
  //      var toolId = request.body.toolId;
        var toolName = request.body.toolName;
      toolServiceObj.putTool(toolId,toolName).then(function(result){
           
            response.json(result);
        },function(err){
            
            response.json(err);
        });
    },
    deleteTool :function(request,response){
        var toolId = request.params.id;
       // var ReplaceID= request.body.replaceId;
        
      //console.log(toolId);
        toolServiceObj.deleteTool(toolId).then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    } 
}
