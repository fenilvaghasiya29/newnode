var userSrvice = require('../service/userService');
var userServiceObj = new userSrvice();

module.exports = {
    getUser : function(request,response){
        userServiceObj.getUser().then(function(result){
            response.json(result);
        },function(err){
            response.json(err);
        });
    },
    getuserbyid : function(request,response){
        var userId = request.params.id;
        userServiceObj.getuserbyid(userId).then(function(result){
           
            response.json(result);
        },function(err){
           
            response.json(err);
        });
    },
    putUser :function(request,response){
        var userId = request.params.id;
       
        var myobj =  { 
        userRole : request.body.userRole,
        status : request.body.status,
        summary : request.body.summary,
        keypoint : request.body.keypoint,
        skill : request.body.skill,
        qualification : request.body.qualification}
        
        userServiceObj.putUser(userId,myobj).then(function(result){
            response.json(result);
        },function(err){
            response.json(err);
        });
    },
    userLogin : function(request,response){
   
        var myobj =  { 
            userName : request.body.userName,
            userRole : request.body.userRole,
            password : request.body.password,
           }
            
           userServiceObj.userLogin(myobj).then(function(result){
       
            response.json(result);
        },function(err){
            
            response.json(err);
        });
    }
}