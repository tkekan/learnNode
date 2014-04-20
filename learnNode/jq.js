//var $ = require('jquery');



function num2dot(num) 
{
    var d = num%256;
    for (var i = 3; i > 0; i--) 
    { 
        num = Math.floor(num/256);
        d = num%256 + '.' + d;
    }
    return d;
}

var temp = num2dot("3232235525");
console.log(temp);
