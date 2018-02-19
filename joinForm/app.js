var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var join = require('./routes/joinForm');

var cookieParser = require('cookie-parser');

// mysql 연동 시작
var mysql = require('mysql');

var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var client = mysql.createConnection({
    hostname : "127.0.0.1:3306",
    user : "root",
    password : "root",
    database : "test"
});

server.listen(port,function(){
  console.log("Connect Server : " + port);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/test', function(req, res){
    var userName = 'name1';
    var owner = 'name2';

    client.query('SELECT * FROM users WHERE name = ?', userName, function(err, result){
        if(err) throw err;
        var userId = result1[0].id;
        console.log("테스트 : " + userId);

        client.query('SELECT * FROM cars WHERE owner = ?', owner, function(err, result2){
          var carName = result2[0].car_name;
          console.log('테스트 : ' + carName);
        });
    });

    res.render('test', {
        userId : userId
    });
});

// mysql 연동 종료

app.use(cookieParser());

app.get('/setCookie',function(req, res){
    res.cookie('string', 'cookie');
    res.cookie('json',{
        name : 'cooke',
        property : 'delicious'
    });
    res.redrect('/getCookie');
});

app.get('/getCookie', function(req, res){
    res.send(req.cookie);
    console.log(req.cookie.loginCookie);
});



app.listen(7777.function()){
    console.log("server on 7777");
}

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/join', join);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
