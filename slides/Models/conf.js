var conf = {
	url: 'flame.mongohq.com',
	port: 27038,
	user: 'Siedrix',
	password: 'Tailandia1#',
	database: 'ApiHackaton'
}

var url = "mongodb://"+conf.user+":"+conf.password+"@"+conf.url+":"+conf.port+"/"+conf.database
//url = 'mongodb://Siedrix:RusiaWithLove@flame.mongohq.com:27038/slides';
module.exports = url;
