//1.서버 사용을 위해 http 모듈을 http 변수에 입력
var http = require('http');

//2_1. 요청한 url을 객체로 만들기 위해 url 모듈사용
var url = require('url');
// url : 내장 module 클라이언트가 요청한 주소값을 javascript 객체로 변환해서 사용할 수 있게 하는 모듈

//2.2 요청한 url 중에 querystring을 객체로 만들기 위해 querystring 모듈 사용
var querystring = require('querystring');
// querystring : querystring을 변환하여 javascript 객체로 사용할 수 있게 해주는 모듈

//2. http 모듈로 서버를 생성
var server =
  http.createServer(function(request, response){

//2_3 콘솔화면에 로그 시작 부분 출력
    console.log('-- log start --');

//2_4 브라우저에서 요청한 주소를 parsing 하여 객체화 후 출력
    var parsedUrl = url.parse(request.url);
    console.log(parsedUrl);

//2_5. 객체화된 url 중에 querystring 부분만 따로 객체화 후 출력
    var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
    console.log(parsedQuery);

//2_6. 콘솔화면에 로그 종료 부분을 출력
    console.log('-- log end --');

  response.writeHead(200,{'Content-Type': 'text/html'});
  response.write('hello node.js <br/>');
  response.end('var1의 값은 '+parsedQuery.var1);
});

//3. listen 함수로 8080 포트를 가진 서버 실행
server.listen(8080, function(){
  console.log('Server is running');
});
