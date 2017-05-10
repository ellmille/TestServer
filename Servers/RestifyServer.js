/**
 * Created by Elle on 5/10/2017.
 */
var restify    = require('restify');
var q 		   = require('q');
var JSON       = require('JSON');
var database   = require('./../DB/DBIO');

var server = restify.createServer({
    name: 'RestifyServer',
    version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var CreateRestifyServer = function(port, host){
    server.listen(port, host, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
};

function respondPolitely(req, res, next){
    res.send("Hello There");
    return next();
}
function processPost(req, res, next){
    res.send(201, Math.random().toString(36).substr(3, 8));
    return next();
}
function processGetHR(req, res, next){
    var sqlSelect = "SELECT `HR` FROM `Vitals`";
    database.CreateSelectQuery(sqlSelect).then(function (values) {
        console.log(values);
        if(values[0].HR !== null){
            res.send("First HR: "+values[0].HR);
        }
    }, function (error) {
        res.send(error);
    });
    return next();
}
function processPostHR(req, res, next){
    var jsonPost = JSON.parse(req.body);
    if(jsonPost.hr !== null && jsonPost.spo2 !== null){
        var sqlInsert = "INSERT INTO `Vitals` (`HR`, `SPO2`) VALUES ("+parseInt(jsonPost.hr)+", "+parseInt(jsonPost.spo2)+")";
        database.CreateInsertQuery(sqlInsert);
    }
    res.send('Cool Post Bro');
    return next();
}

var PATH = '/test/:id';
server.get(PATH, respondPolitely);
server.post(PATH, processPost);
server.put(PATH, respondPolitely);
server.del(PATH, respondPolitely);
server.head(PATH, respondPolitely);

server.get('/hr', processGetHR);
server.post('hr/:id', processPostHR);

exports.CreateRestifyServer = CreateRestifyServer;