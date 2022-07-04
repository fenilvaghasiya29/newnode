//var logger = require('../config/logger');
var tagService = require('../service/tagService');
var tagServiceObj = new tagService();

module.exports = {
    getTag : function(request,response){
        
        tagServiceObj.getTag().then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    },
    postTag :function(request,response){
        var tagName = request.body.tagName;
       
        tagServiceObj.postTag(tagName).then(function(result){
       
            response.json(result);
        },function(err){
            
            response.json(err);
        });
    },
  
    putTag :function(request,response){
        var tagId = request.params.id ||request.body.tagId;
  //      var tagId = request.body.tagId;
        var tagName = request.body.tagName;
      tagServiceObj.putTag(tagId,tagName).then(function(result){
           
            response.json(result);
        },function(err){
            
            response.json(err);
        });
    },
    deleteTag :function(request,response){
        var tagId = request.params.id;
       // var ReplaceID= request.body.replaceId;
        
      //console.log(tagId);
        tagServiceObj.deleteTag(tagId).then(function(result){
            
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    } 
}
