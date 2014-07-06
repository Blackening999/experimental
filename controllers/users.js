var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.authCallback = function(req, res, next) {
	res.redirect('/');
};

exports.signin = function(req, res) {
	res.redirect('/', {
		error: req.flash('error')
	});
};

//exports.signup = function(req, res) {
//	res.render('layouts/signup', {
//		title: 'Sign up',
//		user: new User()
//	});
//};

exports.signout = function(req, res) {
	req.logout();
    res.send({ toRoute: "login" });
};


exports.session = function(req, res) {
	res.send(req.user);
};

//exports.create = function(req, res) {
//	var user = new User(req.body);
//
//	user.provider = 'local';
//	user.save(function(err) {
//		if (err) {
//			console.log('the error');
//			console.log(err);
//			return res.render('layouts/signup', {
//				errors: err.errors,
//				user: user
//			});
//		}
//		req.logIn(user, function(err) {
//			if (err) return next(err);
//			return res.redirect('/');
//		});
//	});
//};

//exports.show = function(req, res) {
//	var user = req.profile;
//
//	res.render('layouts/show', {
//		title: user.name,
//		user: user
//	});
//};

//exports.me = function(req, res) {
//	res.jsonp(req.user || null);
//};

exports.user = function(req, res, next, id) {
	User
		.findOne({
			_id: id
		})
		.exec(function(err, user) {
			if (err) return next(err);
			if (!user) return next(new Error('Failed to load User ' + id));
			req.profile = user;
			next();
		});
};