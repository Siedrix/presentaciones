var fs = require('fs');

console.log('empezando ejemplo');
fs.readdir('./',function(err,data){
	console.log(data);
});
console.log('terminando ejemplo');
