//1.서버 사용을 위해 http 모듈을 http 변수에 입력
var http = require('http');

//2. http 모듈로 서버를 생성
var server =
  http.createServer(function(request, response){
  response.writeHead(200,{'Content-Type': 'text/html'});
  response.end('hello node.js');
});

//3. listen 함수로 8080 포트를 가진 서버 실행
server.listen(8080, function(){
  console.log('Server is running');
});
