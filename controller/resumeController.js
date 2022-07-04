var resumeService = require('../service/resumeService');
var resumeServiceObj = new resumeService;
var async = require('async');
var fs = require('fs');
const { arch } = require('os');

module.exports = {
    getUserResume: function (request, response) {
        const val = Math.floor(10 * Math.random() * 9000);
        console.log(val);
        userObj = {
            userId: request.body._id,
            userName: request.body.userName,
            summary: request.body.summary,
            keypoint: request.body.keypoint,
            skill: request.body.skill,
            qualification: request.body.qualification,
            randomNumber: val
        }
        async.series([function (callback) {
            var archiver = require('archiver');
            var archive = archiver('zip', {
                gzip: true,
                zlib: { level: 9 }
            });

            var output = fs.createWriteStream('G:/cspit/sem8/profilbuilder/backendpp/GeneratedResume/' + val + '.zip');
            archive.on('error', function (error) {
                console.log('Error while archiving ', error);
            });
            // console.log(__dirname);
            resumeServiceObj.getUserResume(userObj).then(function (result) {
              resumeName = result.data;
                archive.pipe(output);
                archive.file('G:/cspit/sem8/profilbuilder/backendpp/GeneratedResume/' + resumeName + val + '.docx', { name: result.data + ".docx" });
                archive.on('end', function () {
                    callback("Resume");
                });
                archive.finalize();

            }, function (responseObject) {
                // console.log(responseObject);
                // logger.debug('<getUserResume()  in Controller Reject ');
                // fs.unlinkSync(__dirname + '/../GeneratedResume/' + val + '.zip');
                response.json("There is no data found For this user");
            });
        }], function (responseObject) {
            //deleting word file of the users
            // console.log(responseObject);
            var docPath;
            
            docPath = 'G:/cspit/sem8/profilbuilder/backendpp/GeneratedResume/' + resumeName + val + '.docx';
            // console.log(docPath);
            // logger.debug("Downloading from %s", docPath);
            response.download(docPath, 'simple.zip', function (err) {
                if (err) {
                    throw err;
                }
                
                fs.unlinkSync('G:/cspit/sem8/profilbuilder/backendpp/GeneratedResume/' + val + '.zip');
                fs.unlinkSync('G:/cspit/sem8/profilbuilder/backendpp/GeneratedResume/' + resumeName + val + '.docx');
                // logger.debug('<getUserResume()  in Controller fullfill');
            });
        });
    },

    projectInfo: function (request, response) {
        // console.log(request.body._id);
        userObj = {
            userId: request.body._id,
            userName: request.body.userName,
            summary: request.body.summary,
            keypoint: request.body.keypoint,
            skill: request.body.skill,
            qualification: request.body.qualification
        }
        resumeServiceObj.getprojectInfo(userObj).then(function (result) {
            // console.log(result);
            response.json(result);
        },
            function (err) {
                response.json(err);
            });
    },
}