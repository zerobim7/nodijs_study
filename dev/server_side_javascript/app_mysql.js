var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended:false}));


app.get('/topic/add', function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send('server error');
    }
      res.render('add', {topics:topics});
  });
});


app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic(title, description, author) VALUES (?, ?, ?)';
  conn.query(sql, [title, description, author], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/'+result.insertId);
    }
  });
});

app.post(['/topic/:id/edit'], function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = 'UPDATE topic SET title = ?, description = ?, author = ? WHERE id = ?';
  conn.query(sql, [title, description, author, id],function(err, rows, fields){
      if(err){
        console.log(err);
        res.status(500).send('server error');
      } else {
        res.redirect('/topic/'+ id);
      }
  });
});



app.get(['/topic/:id/edit'], function(req, res){

  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id = ?';
      conn.query(sql, [id], function(err, topic, fields){
        if(err){
          console.log(err);
          res.status(500).send('server error');
        } else {
          res.render('edit', {topics:topics, topic:topic[0]});
        }
      });
    } else {
      console.log('There is no id.');
      res.render('view', {topics:topics});
    }
  });

});


app.get(['/topic/:id/del'], function(req, res){
  var sql = 'DELETE FROM topic WHERE id = ?';
  var sql2 = 'SELECT id, title FROM topic';
  var id = req.params.id;


    conn.query(sql, [id],function(err, rows, fields){
      if(err){
        console.log(err);
        res.status(500).send('server error');
      } else {
        if(rows.length === 0 ){
          console.log(err);
          res.status(500).send('server error');
        } else {

          conn.query(sql2, function(err, topics, fields){
            res.render('view', {topics:topics});
          });

        }
      }
    });


});



app.get(['/topic', '/topic/:id'], function(req, res){

  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id = ?';
      conn.query(sql, [id], function(err, topic, fields){
        if(err){
          console.log(err);
        } else {
          res.render('view', {topics:topics, topic:topic[0]});
        }
      });
    } else {
    res.render('view', {topics:topics});
    }
  });

});



app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+ title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
});



/*
app.get('/topic/:id', function(req, res){
  var id = req.params.id;

  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('server error');
    }

    fs.readFile('data/'+id, 'utf8', function(err, data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
        res.render('view', {topics:files, title:id, description:data});
    });
  });
});
*/



app.listen(3000, function(){
    console.log('Connected, 3000 port');
});

var mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'localhost',
  port : '3307',
  user : 'root',
  password : '111111',
  database : 'o2'
});
