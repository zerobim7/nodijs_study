
// 1. fs(파일 시스템 모듈 사용)
var fs = require('fs');

// 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
fs.readFile('home.js', 'utf-8', function(error, data){
    console.log('01 readAsync: %s', data);
});

// 3. 동기 방식의 파일읽기. 파일을 읽은 후 data 변수에 저장
var data = fs.readFileSync('home.js', 'utf-8');
console.log('02 readSync: %s', data);
