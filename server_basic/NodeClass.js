// use_class.js 에서 사용

function Clazz(){
  this.name = 'Hello there!';
  this.message;
}

// message 변수에 값을 입력하는 함수
Clazz.prototype.setMessage = function(msg){
  this.message = msg;
}

// message 변수의 값을 가져오는 함수
Clazz.prototype.getMessage = function(){
  return this.message;
}

//exports 명령어를 사용함으로써 다른파일에서 require 예약어를 이용해 Clazz 객체를 사용할수 있게 된다.
//exports 명령어의 위치는 파일의 어떤곳에 위치해도 동일하게 동작한다.
module.exports = Clazz;
