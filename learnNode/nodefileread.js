var fs = require('fs');
var jf = require('jsonfile')


fs.readFile('Book2.csv',{encoding: 'utf8'}, function (err, data) {
  if (err) throw err;
  //console.log(data);
});
var jsonObject=[];





var Lazy = require('lazy'),

lazy = new Lazy(fs.createReadStream('Book2.csv'))
    .lines
    .map(String)
    .map(function(lineData){
     	var fields = lineData.trim().split(',', 4);
     	var jsoninput = {
     		col1: fields[0],
     		col2: fields[1],
     		col3: fields[2],
     		col4: fields[3]
     	};
     	
     	jsonObject.push(jsoninput);
     	console.log(jsonObject);
     	var file = 'data.json';
		jf.writeFile(file, { data : jsonObject }, function(err) {
  
		})

     })
 




 //console.log(jsonObject);
