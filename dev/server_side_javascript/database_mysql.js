var mysql = require('mysql');

var conn = mysql.createConnection({
  host : 'localhost',
  port : '3307',
  user : 'root',
  password : '111111',
  database : 'o2'
});

conn.connect();


/*
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields){
  if(err) throw err;
  console.log('The solution is: ', row[0].solution);
});
*/

/*
var sql = 'INSERT INTO topic(title, description, author) VALUES(?, ?, ?)';
var params = ['Supervisor2', 'Watcher2', 'graphtittle2'];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
    for(var i = 0; i<rows.length; i++){
      console.log(rows[i].author);
    }
    console.log('rows', rows);
    console.log('fields', fields);
  }
});
*/

/*
var sql = 'INSERT INTO topic(title, description, author) VALUES(?, ?, ?)';
var params = ['Supervisor2', 'Watcher2', 'graphtittle2'];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
      console.log(rows.insertId);
  }
});
*/

/*
var sql = 'UPDATE topic SET title = ?, description = ?, author = ? WHERE id = ?';
var params = ['Supervisor3', 'Watcher3', 'graphtittle3', '3'];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
      console.log(rows);
  }
});
*/


var sql = 'DELETE FROM topic WHERE id = ?';
var params = [3];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
      console.log(rows);
  }
});


conn.end();
