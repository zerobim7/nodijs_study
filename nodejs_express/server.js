const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

app.set('views', __dirname + '/views'); //서버가 읽을수 있도록 HTML의 위치를 정의
app.set('view engine', 'ejs'); //서버가 HTML을 렌더링 할 때, EJS엔진을 사용하다록 설정
app.engine('html', require('ejs').renderFile);//서버가 HTML을 렌더링 할 때, EJS엔진을 사용하다록 설정

let servser = app.listen(3000, () => {
    console.log("Express server has started on port 3000");
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));


let router = require('./router/main')(app, fs); // 라우터모듈인 main.js를 불러와서 app에 전달
//임시 router
/*
app.get('/', (req, res) => {
    res.send('Hello World');
});
*/
