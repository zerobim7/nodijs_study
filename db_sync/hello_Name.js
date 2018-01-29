var express = require('express');
var port = 3000;
var app = express();

app.get('/name/:user_name', function(req, res){
  res.status(200);
  res.set('content-type', 'text/html');
  res.end('<html><body>' +
        '<h1>Hello '+ req.param.user_name + '</h1></body></html>');
});

app.get('*', function(req, res){
  res.end('Hello World2');
});

app.listen(port, function(){
  console.log('The server is running' +
'please open your browser at http://localhost:%s', port);
});
