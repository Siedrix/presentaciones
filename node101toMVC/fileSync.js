var fs = require('fs');

console.log('empezando ejemplo');
var dir = fs.readdirSync('./');
console.log(dir);
console.log('terminando ejemplo');
