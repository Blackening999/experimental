var mongoose = require('mongoose'),
    passport = require('passport'),
    HttpError = require('error').HttpError,
	User = mongoose.model('User');

exports.authCallback = function(req, res) {
	res.redirect('/');
};

exports.reject = function(req, res) {
	res.redirect('/', {
		message: req.flash('error')
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


exports.session = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.send({ error: info.message });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            res.send({
                _id: user.get('id'),
                name: user.get('name'),
                email: user.get('email'),
                is_admin: user.get('is_admin'),
                is_owner: user.get('is_owner')
            });
        });
    })(req, res, next);
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

exports.get = function(req, res) {
	var user = req.profile;
    res.send({ user: user._doc });
};

exports.put = function(req, res) {
    User.update({_id: req.params._id}, req.body.user, function(err, updateRes) {
        if (err) new HttpError(err);
        res.send(JSON.stringify(updateRes));
    });
};

//exports.me = function(req, res) {
//	res.send(req.user || null);
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