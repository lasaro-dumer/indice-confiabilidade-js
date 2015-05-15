/**
* Module dependencies.
*/

var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var execute = require('./routes/execute');
var path = require('path');
var pg = require('pg');
var myMath = require('./routes/myMath');

var server_port = process.env.PORT || 5000
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
app.get('/execute', execute.execute);
app.get('/testVariancia',function(req,res){
    var amostra = [118,121,124,117,120,120];
    var ret = myMath.variancia(amostra);
    res.send(ret);

});

app.get('/testVariancia2',function(req,res){
    var amostra = [118,121,124,117,120,120];
    var ret = myMath.variancia(amostra,120);
    res.send(ret);

});

var io = require('socket.io').listen(app.listen(app.get('port'), function(){
                                        process.env.NODE_ENV = app.get('env');
                                        console.log("Running in "+ process.env.NODE_ENV +" mode");
                                        console.log("Listening on localhost:" + app.get('port'));
                                      }));
