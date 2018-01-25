
var http = require('http');
var querystring = require('querystring');


//1 http 모듈로 서버를 생성
var server =
  http.createServer(function(request, response){

//2 post로 전달된 데이터를 담을 변수를 선언
    var postdata = '';
//3 request 객체에 on() 함수로 'data' 이벤트를 연결
  request.on('data', function(data){
      postdata = postdata + data;
  });

//4 request객체에 on() 함수로 'end' 이벤트를 연결
request.on('end', function(){
  //5 콘솔화면에 로그 시작 부분 출력
      console.log('-- log start --');

  //6 end 이벤트가 발생하면 (end는 한번만 발생한다) 3번에서 저장해둔 postdata를 querystring으로 객체화
      var parsedQuery = querystring.parse(postdata);
      console.log(parsedQuery);

  //7 콘솔화면에 로그 종료 부분을 출력


    response.writeHead(200,{'Content-Type': 'text/html'});
    response.write('hello node.js <br/>');
    response.end('var1의 값은 = ' + postdata);

    console.log('-- log end --');
});
});


//8 listen 함수로 8080 포트를 가진 서버 실행
server.listen(8080, function(){
  console.log('Server is running');
});
