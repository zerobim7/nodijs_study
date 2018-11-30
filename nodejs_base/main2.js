//@@Blocking Code (일반 코딩할때 쓰이는 순서가 정해진 코딩)
/*
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("program has ended");
*/


//@@Non-Blocking Code
/*
var fs = require("fs");

fs.readFile('input.txt', (err, data) => {
    if(err) return console.error(err);
    console.log(data.toString());
});

console.log("Program has ended");
*/


//@@ call back ex1
/*
plus = function(a,b,c,callback){
    var result = a + b + c;
    callback(result);
}

plus(5,10,1,function(res){
    console.log(res);
})
*/

//@@call back ex2
/*
pm = function(a,b,callback){
    callback(a+b, a-b);
}

pm(5,3,function(res1, res2){
    console.log(res1);
    console.log(res2);
})
*/



//@@Event Handling
/*
//events 모듈사용
var events = require('events');

//EventEmitter 객체생성
var eventEmitter = new events.EventEmitter();

// EventHandler 함수 생성
var connectHandler = function connected(){
    console.log("Connection Successful");

    // data_recevied 이벤트를 발생시키기
    eventEmitter.emit("data_received");
}

//connection 이벤트와 connectHandler 이벤트 핸들러를 연동
eventEmitter.on('connection', connectHandler);

//data_received 이벤트와 익명 함수와 연동
// 함수를 변수안에 담는 대신에, .on() 메소드의 인자로 직접 함수를 전달
eventEmitter.on('data_received', function(){
    console.log("Data Received");
});

//connection 이벤트 발생시키기
eventEmitter.emit('connection');

console.log("Program has ended");
*/


//@@eventEmitter Using
/*
const EventEmitter = require('events');
const util = require('util');

function MyEmitter(){
    EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
    console.log('an event occurred!');
});

myEmitter.emit('event');
*/



//@@eventEmitter Using for short
/*
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter;

myEmitter.on('event', () => {
    console.log('an event occurred');
});

myEmitter.emit('event');
*/

//@@ callback ex2
/*
pm = function(a,b,callback){
    callback(a+b, a-b);
}

pm(5,3,function(res1, res2){
    console.log(res1);
    console.log(res2);
})
*/

//@@ callback ex2 => emitter
const events = require('events');
const eventEmitter = new events.EventEmitter();

let connectHandler1 = (a, b, c, callback) => {
    console.log('connenctHandler1 function start');
    callback(a+b+c, c-b-a);
    console.log('connenctHandler1 function end');
}

let connectHandler2 = (a, b, c, callback) => { 
    console.log('connenctHandler2 function start');
    callback(c*b*a);
    console.log('connenctHandler2 function end');
}

eventEmitter.on('connect1', (a,b,c,callback) => {
    console.log('connect1 event start');
    connectHandler1(a,b,c,(res1,res2) => {
        console.log('connenctHandler1 event start');
        callback(res1, res2);
        console.log('connenctHandler1 event end');
    });
    console.log('connect1 event end');
});


eventEmitter.on('connect2', (d,e,f,callback) => {
    console.log('connect2 event start');
    connectHandler2(d,e,f,(res3) => {
        console.log('connenctHandler2 event start');
        callback(res3);
        console.log('connenctHandler2 event end');
    });
    console.log('connect2 event end');
});

    


eventEmitter.on('connect3', (a,b,c,callback) => {
    console.log('connect3 event start');
    let result1, result2, result3; 
    eventEmitter.emit('connect1',a,b,c,(res1, res2)=>{
        console.log('connect3 event connect1');
        console.log(res2);
        console.log(res1);
        result1 = res1;
        result2 = res2;
    });

    console.log('//////////////////////');
    console.log('connect3 event middle');
    console.log('//////////////////////');

    eventEmitter.emit('connect2',a,b,c,(res)=>{
        console.log('connect3 event connect2');
        console.log(res);
        result3 = res;
    });
    callback(result1, result2, result3);
    console.log('connect3 event end');
});

eventEmitter.on('connect4', (a,b,c,callback) => {
    console.log('connect4 event start');
    eventEmitter.emit('connect3', a,b,c,(res1,res2,res3) => {
        callback(res1,res2,res3);
    });
    console.log('connect4 event end');
});

eventEmitter.emit('connect4', 1,3,5,(res,res1,res2) => {
    console.log('event start');
    console.log(res);
    console.log(res1);
    console.log(res2);
    console.log('event end');
});