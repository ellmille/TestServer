/**
 * Created by Elle on 5/10/2017.
 */

var db         = require('./DB/DBIO');
var noderoute  = require('./Servers/NodeRouterServer');
var restify    = require('./Servers/RestifyServer');
var express    = require('./Servers/ExpressServer');

//database variables
var dbUser = 'root';
var dbPass = 'root';
var dbName = 'node_test';

var port = 8081;
var host = '127.0.0.1';

//initialize the server and database
noderoute.CreateNodeRouterServer(port, host);
restify.CreateRestifyServer(port + 1, host);
express.CreateExpressServer(port + 2, host);
db.InitDB(dbName, dbUser, dbPass);