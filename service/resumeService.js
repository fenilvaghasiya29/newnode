var RSVP = require('rsvp');
var resume = require('../dao/resume');
var resumeObj = new resume;
function resumeService() { }

module.exports = resumeService;

resumeService.prototype.getUserResume = function (userObj) {
    // console.log(userObj);
    return new RSVP.Promise(function (fulfill, reject) {
        var responseUserResume = new Object();
        resumeObj.downloadResume(userObj).then(function (data) {
            // console.log(data.length);
            if (data.length == 0) {
                responseUserResume.success = "false";
                responseUserResume.msg = constant.ERROR_DESC_MISSING_RECORD;
                reject(responseUserResume);
            } else {
                responseUserResume.success = "true";
                responseUserResume.data = data;
                // console.log(responseUserResume);
                fulfill(responseUserResume);
            }
        }, function (err) {
            responseUserResume.success = "false";
            responseUserResume.msg = err;
            reject(responseUserResume);
        });
    });
};

resumeService.prototype.getprojectInfo = function (userObj) {
    // console.log(userId);
    return new RSVP.Promise(function (fulfill, reject) {
        var responseUserResume = new Object();
        resumeObj.getprojectInfo(userObj).then(function (data) {
            // console.log(data.length);
            if (data.length == 0) {
                responseUserResume.success = "false";
                responseUserResume.msg = constant.ERROR_DESC_MISSING_RECORD;
                reject(responseUserResume);
            } else {
                responseUserResume.success = "true";
                responseUserResume.data = data;
                // console.log(data);
                fulfill(responseUserResume);
            }
        }, function (err) {
            responseUserResume.success = "false";
            responseUserResume.msg = err;
            reject(responseUserResume);
        });
    });
};

// resumeService.prototype.download = function () {
//     // console.log(userId);
//     return new RSVP.Promise(function (fulfill, reject) {
//         var responseUserResume = new Object();
//         resumeObj.download().then(function (data) {
//             // console.log(data.length);
//             if (data.length == 0) {
//                 responseUserResume.success = "false";
//                 responseUserResume.msg = constant.ERROR_DESC_MISSING_RECORD;
//                 reject(responseUserResume);
//             } else {
//                 responseUserResume.success = "true";
//                 responseUserResume.data = data;
//                 // console.log(data);
//                 fulfill(responseUserResume);
//             }
//         }, function (err) {
//             responseUserResume.success = "false";
//             responseUserResume.msg = err;
//             reject(responseUserResume);
//         });
//     });
// };

