/**
 * Created by Elle on 5/10/2017.
 */
var express    = require('express');
var server     = express();
var q 		   = require('q');
var JSON       = require('JSON');
var bodyParser = require('body-parser');
var database   = require('./../DB/DBIO');

var CreateExpressServer = function (port, host) {
    server.listen(port, host, function () {
        console.log('ExpressServer listening at http://127.0.0.1:8083');
    });
};

server.use(bodyParser.json());
server.use(bodyParser.text({extended: true}));

server.route('/vital')
    .get(function(req, res){
        hrResponse(req, res);
    })
    .post(function(req, res){
        hrPost(req, res);
    });

function politeResponse(req, res) {
    res.send("Hello there!");
}

function globalResponse(req, res){
    res.send("HI THERE");
}

function wildcardResponse(req, res) {
    res.send('wildcard');
}

function hrResponse(req, res) {
    var sqlSelect = "SELECT `HR` FROM `Vitals`";
    database.CreateSelectQuery(sqlSelect).then(function (values) {
        console.log(req.params);
        if(values[0].HR !== null){
            res.send("First HR: "+values[0].HR);
        }
    }, function (error) {
        res.send(error);
    });
}
function hrPost(req, res){
    var jsonPost = JSON.parse(req.body);
    if(jsonPost.hr !== null && jsonPost.spo2 !== null){
        var sqlInsert = "INSERT INTO `Vitals` (`HR`, `SPO2`) VALUES ("+parseInt(jsonPost.hr)+", "+parseInt(jsonPost.spo2)+")";
        database.CreateInsertQuery(sqlInsert);
    }
    res.send('cool post bro');
}

server.get('/', politeResponse);
server.post('/', politeResponse);
server.all('/global', globalResponse);
server.get('/wi(l)?d/', wildcardResponse);
server.get('/hr/:id', hrResponse);

exports.CreateExpressServer = CreateExpressServer;