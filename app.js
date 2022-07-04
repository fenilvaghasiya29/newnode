var express = require('express');
var path = require('path');
//var fileUpload = require('express-fileupload');
// var favicon = require('serve-favicon');
//var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();

//app.use(logger('dev'));
//app.use(fileUpload());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(3000,()=>{
    console.log("server is listen 3000 port")
})

require('./routes/routes.js')(app);
module.exports = app;

