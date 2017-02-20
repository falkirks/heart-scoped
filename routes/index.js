
var index = function (io) {
    var express = require('express');
    var router = express.Router();
    var users = {};

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
    router.get('*', function(req, res, next) {
        res.render('heart');
    });
    io.on('connection', function (socket) {
        var path = null;
        socket.on('hello', function (data) {
            if(validPath(data.path)) {
                if (data.path === '') data.path = 'all';
                if (path !== null) socket.leave(path);
                socket.join(data.path, function () {
                    path = data.path;
                    socket.emit('welcome', {path: path});
                });
            }
        });
        socket.on('heart', function (data) {
            if(validPath(data.path)) {
                var to = socket.broadcast.to('all');
                var pathSplit = data.path.split('.');
                console.log(pathSplit);
                for (var i = 1; i <= pathSplit.length; i++) {
                    to.to(pathSplit.slice(0, i).join('.'));
                }
                to.emit('heart', {path: data.path});
            }
        });
        socket.on('disconnect', function () {
          // DISCONNECT CODE
        });
    });
    return router;
};

var validPath = function(path){
    return typeof path === 'string' || path instanceof String;
};

module.exports = index;
