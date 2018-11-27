var http = require("http");

http.createServer(function(request, response){

    /*  HTTP 헤더 전송
        HTTP Status : 200 : OK
        Content Type: text/plain
    */
    response.writeHead(200, {'Content-Type' : 'text/plain'});

    response.end("Hello World"); //Response Body를 "Hello World" 로 설정

}).listen(8081);

//Blocking Code (일반 코딩할때 쓰이는 순서가 정해진 코딩)
/*
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("program has ended");
*/

//Non-Blocking Code
/*
var fs = require("fs");

fs.readFile('input.txt', function (err, data){
    if(err) return console.error(err);
    console.log(data.toString());
});
console.log("Program has ended");
*/


console.log("Server running at http://127.0.0.1:8081");