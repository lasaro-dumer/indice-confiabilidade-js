/**
* Module dependencies.
*/

var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var path = require('path');
var pg = require('pg');

var server_port = process.env.PORT || 5000
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
//global.conString = process.env.DATABASE_URL || 'postgres://sniugvsmhjrjoa:19OtuzbOYPLJYlJN2mcXR8p0CD@ec2-54-235-250-41.compute-1.amazonaws.com:5432/db1v390e3cajgv?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
//process.env.HEROKU_POSTGRESQL_CHARCOAL_URL;
var app = express();

// all environments
app.set('port', server_port);
app.use(express.cookieParser());
app.use(session({
  secret: 'keyboard cat'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
var io = require('socket.io').listen(app.listen(app.get('port'), function(){
                                        process.env.NODE_ENV = app.get('env');
                                        console.log("Running in "+ process.env.NODE_ENV +" mode");
                                        console.log("Listening on localhost:" + app.get('port'));
                                      }));
