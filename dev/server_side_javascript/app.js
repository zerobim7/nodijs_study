var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var multer = require('multer');

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/form', function(req, res){
  res.render('form');
});

app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title +','+ description);
});

app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
    res.send(title +','+ description);
});



app.get('/topic/:id', function(req, res){

  var topics = [
    'javascript is...',
    'Nodejs is...',
    'Express is...'
  ];

  var output = `
    <a href="/topic?id=0">javascript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.params.id]}
  `
  res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id +','+ req.params.mode);
});



app.get('/param/:module_id/:topic_id', function(req, res){
  res.json(req.params);
});

app.get('/template', function(res,res) {
  res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/dynamic', function(req, res) {
var lis = '';
for(var i=0; i<5; i++){
  lis = lis + '<li>coding</li>';
}

var time = Date();

  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello Dynamic!!!
      <ul>
      ${lis}
      </ul>
    </body>
  </html>`;
  res.send(output);
})

app.get('/route', function(req, res) {
  res.send('Hello Router, <img src="/dog.jpg">');
});

app.get('/login', function(req,res){
  res.send('login please');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
