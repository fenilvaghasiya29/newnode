var projectController = require('../controller/projectController');
//var technologyController = require('./controller/technologyController');
var technologyController = require('../controller/technologyController')
var tagController = require('../controller/tagController');
var toolController = require('../controller/toolController');
// var loginController = require('./controller/loginController');
 var userController = require('../controller/userController');
 const profileController = require('../controller/profileController');
 const resumeController = require('../controller/resumeController');
 // var tokenController = require('./controller/tokenController');
// var resumeController = require('./controller/resumeController');
// var importProject = require('./controller/importProjectController');

module.exports = function (app) {
    //login Routes
    // app.post('/login', loginController.getLoggedIn);

    // app.use('/restapi', tokenController.handleToken);
 // //Resume Routes Routes
 app.post('/restapi/userresume', resumeController.getUserResume);
 app.post('/restapi/projectInfo', resumeController.projectInfo);
 
    //CSV Import File
   // app.post('/restapi/importProject', validateUserRole, importProject.importProjectFile);

    //Project  Routes
    // app.post('/restapi/projectids', validateUserRole, projectController.getProjectById);

    // app.get('/restapi/project/:id', validateUserRole, projectController.getProjectById);

     app.get('/restapi/projects', projectController.getProject);

    // app.post('/restapi/myprojects/:id', validateUserRole, projectController.getIdAllMyProject);

    // app.post('/restapi/myprojects', projectController.getAllMyProject);

     app.post('/restapi/project', projectController.postProject);

     app.put('/restapi/project/:id', projectController.putProject);

     app.put('/restapi/project/contribution/:id', projectController.putContribution);

     app.delete('/restapi/project/:id', projectController.deleteProject);

    // app.delete('/restapi/project/:id', function (request, response, next) {
    //     if (request.body.userRole == "super_admin" || request.body.projectType == "nonvolansys") {
    //         console.log("valid user Role admin or Super Admin");
    //         next();
    //     }
    //     else {
    //         response.sendStatus(403);
    //     }
    // }, projectController.deleteProject);

    // //Contribution Routes
    // app.get('/restapi/project/:id/contribution', validateUserRole, projectController.getProjectContribution);

    // app.put('/restapi/contribution/project/:id', projectController.deleteContribution);

// Profile Routes
app.get('/restapi/profile',profileController.getProfile);
app.get('/restapi/profile/:id',profileController.getProfilebyid);
app.post('/restapi/profile/',profileController.postProfile);
app.put('/restapi/profile/:id',profileController.putProfile);
app.delete('/restapi/profile/:id',profileController.deleteProfile);



    //Technology Routes
    app.get('/restapi/technologies', technologyController.getTechnology);

    app.post('/restapi/technology', technologyController.postTechnology);

    app.put('/restapi/technology/:id', technologyController.putTechnology);

    app.delete('/restapi/technology/:id',  technologyController.deleteTechnology);

   // app.put('/restapi/replacetechnology/:id',  technologyController.deleteTechnology);



    //Tags Routes
    app.get('/restapi/tags', tagController.getTag);

    app.post('/restapi/tag', tagController.postTag);

    app.put('/restapi/tag/:id',  tagController.putTag);

    app.delete('/restapi/tag/:id',  tagController.deleteTag);

    // app.put('/restapi/replacetag/:id', validateUserRole, tagController.deleteTag);


    //Tools Routes
    app.get('/restapi/tools', toolController.getTool);

    app.post('/restapi/tool', toolController.postTool);

    app.put('/restapi/tool/:id',  toolController.putTool);

    app.delete('/restapi/tool/:id', toolController.deleteTool);

    // app.put('/restapi/replacetool/:id', validateUserRole, toolController.deleteTool);



    //User Routes
    app.post('/restapi/userlogin', userController.userLogin);

    // app.get('/restapi/activeusers', userController.activeusers);

    // app.post('/restapi/selectactiveusers', userController.getselectactiveusers);

     app.get('/restapi/users', userController.getUser);
    //  app.get('/restapi/users',  userController.getUser);

    //  app.put('/restapi/user/:id', userController.putUser);
     app.get('/restapi/user/:id',userController.getuserbyid);
 
    // app.post('/restapi/users', validateUserRole, userController.postUser);

    // app.post('/restapi/getselecteduser', validateUserRole, userController.getselecteduser)

    // app.get('/restapi/users/sync', validateUserRole, userController.syncUser);

     app.put('/restapi/user/:id', userController.putUser);

    // app.delete('/restapi/user/:id', validateUserRole, userController.deleteUser);

    // //Resume Routes Routes
    // app.post('/restapi/userresume', resumeController.getUserResume);

    // app.get('/restapi/userresume/preview/:id', resumeController.getPreview);

    // app.post('/restapi/customeresume/:id', resumeController.customeResume);

    // app.get('/restapi/customresume/preview/:id', resumeController.getCustomPreview);

    // //User Profile Routes
    // app.get('/restapi/userprofile/:id', userController.getUserProfile);

    // app.put('/restapi/userprofile/:id', userController.putUserProfile);


    // //validate Role method
    // function validateUserRole(request, response, next) {
    //     if (request.body.userRole == "admin" || request.body.userRole == "super_admin") {
    //         console.log("valid user Role admin or Super Admin");
    //         next();
    //     }
    //     else {
    //         response.sendStatus(403);
    //     }
    // }



}
