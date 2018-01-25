
var res = 0;

exports.division = function(num1, num2){
  if(num1 > num2){
      res = exminus(num1, num2);
  } else {
      res = exsum(num1, num2);
  }
  return res;
}

function exsum(num1, num2){
  console.log('return value1 = '+ num1 + ' // ' + num2);
  return num1 + num2;
}


function exminus(num1, num2){
  console.log('return value2 = '+ num1 + ' // ' + num2);
  return num1 - num2;
}
