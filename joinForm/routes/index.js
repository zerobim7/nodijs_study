var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


var mysql = require('mysql');
var Connect = mysql.createConnection({
  host : 'localhost',
user : '< MySQL username >',
password : '< MySQ: password >',
port : < port >,
database : 'my_db'
});

connection.connect();

connection.query('SELECT * from Persons', function(err, rows, fields) {
  if(!arr){
    console.log('The solution is : ', rows);
  } else {
    console.log();
  }
})
