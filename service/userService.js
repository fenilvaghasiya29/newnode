var RSVP = require('rsvp');
var user = require('../dao/user');
var userObj = new user;
function userService() { }

module.exports = userService;

userService.prototype.getUser = function () {
    return new RSVP.Promise(function (fulfill, reject) {
        var responseUser = new Object();
        userObj.getUserInfo().then(function (data) {
            if (data.length == 0) {
                responseUser.success = "false";
                responseUser.msg = constant.ERROR_DESC_MISSING_RECORD;
                reject(responseUser);
            } else {
                responseUser.success = "true";
                responseUser.data = data;
                fulfill(responseUser);
            }
        }, function (err) {
            responseUser.success = "false";
            responseUser.msg = err;
            reject(responseUser);
        });
    });
};

userService.prototype.getuserbyid = function (userId) {
    
    return new RSVP.Promise(function (fulfill, reject) {
        var responseUser = new Object();
        userObj.getUserInfobyid(userId).then(function (data) {
            if (data.length == 0) {
                responseUser.success = "false";
                //responseTag.msg = constant.ERROR_DESC_MISSING_RECORD;
                reject(responseUser);
            } else {
                responseUser.success = "true";
                responseUser.data = data;
                fulfill(responseUser);
            }
        }, function (err) {
            responseUser.success = "false";
            responseUser.msg = err;
            
            reject(responseUser);
        });
    });
};

userService.prototype.putUser = function (userId, myobj) {
    
    return new RSVP.Promise(function (fulfill, reject) {
        var responseUser = new Object();
        userObj.putUserInfo(userId, myobj).then(function (data) {
            responseUser.success = "true";
            responseUser.data = { "UserId": data };
            responseUser.msg = "Update Successful";
            fulfill(responseUser);
        }, function () {
            responseUser.success = "false";
            responseUser.msg = constant.ERROR_DESC_MISSING_RECORD;
            reject(responseUser);
        });
    });
};
userService.prototype.userLogin = function (myobj) {
  
    return new RSVP.Promise(function (fulfill, reject) {
        var responseUser = new Object();
        userObj.postUserLogin(myobj).then(function (data) {
            // console.log(data);
            if (data.length == 0) {
                responseUser.success = "false";
                responseUser.msg = constant.ERROR_DESC_INVALID_VALUE;
               
                reject(responseUser);
            } else {
                responseUser.success = "true";
                responseUser.data = { "UserInfo": data };
                responseUser.msg = "login Successful";
               
                fulfill(responseUser);
            }
        }, function (err) {
            responseUser.success = "false";
            responseUser.msg = err;
           
            reject(responseUser);
        });
    });
};
