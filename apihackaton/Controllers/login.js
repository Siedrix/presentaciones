var Users = new require('../Models/usersModel');

exports.index = function(req, res){
	if(req.session.user){
		res.redirect('/');
	}else{
		res.render('login/index', {user:'',error:''});
	}
	
}

exports.createUser = function(req, res){
	Users.createUser(req.body,function(err){
		console.log(err);
		res.render('login/index', {user:'', error:err});
	},function(doc){
		req.session.user = doc;
		res.redirect('/');
	});
}

exports.logIn = function(req,res){
	Users.logIn(req.body,function(err){
		console.log(err);
		res.render('login/index', {user:'', error:err});
	},function(doc){
		req.session.user = doc;
		res.redirect('/');
	});
}

exports.logOut = function(req,res){
	req.session.user = '';
	res.redirect('/');
}

