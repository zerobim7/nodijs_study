var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('active successful');
  res.render('joinForm',{title:'회원가입폼~'});
});

router.post('/', function(req, res, next){
  console.log('req.body 콘솔로그 변경 : '+ req.body);
  res.json(req.body);
});

module.exports = router;
