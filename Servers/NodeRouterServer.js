/**
 * Created by Elle on 5/10/2017.
 */
var http       = require('http');
var Router     = require('node-router');
var JSON       = require('JSON');
var bodyParser = require('body-parser');
var q 		   = require('q');
var database   = require('./../DB/DBIO');

var router = Router();
var route  = router.push;

//listen at port 8081
var CreateNodeRouterServer = function(port, host){
    http.createServer(router).listen(port, host);
    console.log('NodeRouterServer Listening at http://127.0.0.1:8081');
};

function getHandler(req, res, next) {
    var json = {version: '1.0', code: 200, message: 'Successful GET Request'};
    res.send(json);
}

function postHandler(req, res, next) {
    var jsonPost = JSON.parse(req.body);
    if(jsonPost.hr !== null && jsonPost.spo2 !== null){
        var sqlInsert = "INSERT INTO `Vitals` (`HR`, `SPO2`) VALUES ("+parseInt(jsonPost.hr)+", "+parseInt(jsonPost.spo2)+")";
        database.CreateInsertQuery(sqlInsert);
    }
    res.send('cool post bro');
}
function hrGetHandler(req, res, next) {
    var sqlSelect = "SELECT `HR` FROM `Vitals`";
    database.CreateSelectQuery(sqlSelect).then(function (values) {
        console.log(values);
        if(values[0].HR !== null){
            res.send("First HR: "+values[0].HR);
        }
    }, function (error) {
        res.send(error);
    });
}

function routerHandler(req, res, next) {
    res.send('Congrats, valid request');
}
function errorHandler(err, req, res, next) {
    res.send(err);
}

//here are our routes
route('POST', bodyParser.text({extended: false}), postHandler);
route('GET', '/hr', hrGetHandler);
route('GET', getHandler);

route(routerHandler);
route(errorHandler);

exports.CreateNodeRouterServer = CreateNodeRouterServer;