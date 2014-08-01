module.exports = function(app, passport, auth) {
	//User Routes
	var users = require('../controllers/users');
	app.get('/reject', users.reject);
//	app.get('/signup', users.signup);
	app.get('/signout', users.signout);

	//Setting up the users api
//	app.post('/users', users.create);

	app.post('/users/session', users.session);

//	app.get('/users/me', users.me);
	app.get('/users/:userId', users.get);
    app.get('/users/:userId', users.put);

	//Finish with setting up the userId param
	app.param('userId', users.user);

	//Setting the facebook oauth routes
	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['user_about_me'],
		failureRedirect: '/'
	}), users.reject);

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/'
	}), users.authCallback);

	//Setting the github oauth routes
	app.get('/auth/github', passport.authenticate('github', {
		failureRedirect: '/'
	}), users.reject);

	app.get('/auth/github/callback', passport.authenticate('github', {
		failureRedirect: '/'
	}), users.authCallback);

	//Setting the twitter oauth routes
	app.get('/auth/twitter', passport.authenticate('twitter', {
		failureRedirect: '/'
	}), users.reject);

	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		failureRedirect: '/'
	}), users.authCallback);

	//Setting the twitter oauth routes
	app.get('/auth/linkedin', passport.authenticate('linkedin', {
		scope: ['r_basicprofile'],
		state: "vf@5$zzdtgh7ygh#$zUtR886G3!213",
		failureRedirect: '/'
	}), users.reject);

	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
		failureRedirect: '/'
	}), users.authCallback);

	//Setting the google oauth routes
	app.get('/auth/google', passport.authenticate('google', {
		failureRedirect: '/',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile'
		]
	}), users.reject);

	app.get('/auth/google/callback', passport.authenticate('google', {
		failureRedirect: '/'
	}), users.authCallback);

};