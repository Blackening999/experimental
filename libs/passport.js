var mongoose = require('mongoose'),
	LocalStrategy = require('passport-local').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	GitHubStrategy = require('passport-github').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
	User = mongoose.model('User'),
	config = require('../config/config');

module.exports = function(passport) {
	//Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, function(err, user) {
			done(err, user);
		});
	});

	//Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			User.findOne({
				email: email
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: "Such user doesn't exist"
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Invalid password'
					});
				}
				return done(null, user);
			});
		}
	));

	//Use twitter strategy
	passport.use(new TwitterStrategy({
			consumerKey: config.twitter.clientID,
			consumerSecret: config.twitter.clientSecret,
			callbackURL: config.twitter.callbackURL
		},
		function(token, tokenSecret, profile, done) {
			User.findOne({
				'twitter.id_str': profile.id
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					user = new User({
						name: profile.displayName,
						username: profile.username,
						avatar: profile._json.profile_image_url.replace("normal", "bigger"),
						provider: 'twitter'
					});
					user.save(function(err) {
						if (err) console.log(err);
						return done(err, user);
					});
				} else {
					return done(err, user);
				}
			});
		}
	));

	//Use facebook strategy
	passport.use(new FacebookStrategy({
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
			profileFields: ['id', 'displayName', 'photos']
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({
				'facebook.id': profile.id
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					user = new User({
						name: profile.displayName,
						avatar: "https://graph.facebook.com/" + profile.id + "/picture?type=normal",
						provider: 'facebook'
					});
					user.save(function(err) {
						if (err) console.log(err);
						return done(err, user);
					});
				} else {
					return done(err, user);
				}
			});
		}
	));

	//Use github strategy
	passport.use(new GitHubStrategy({
			clientID: config.github.clientID,
			clientSecret: config.github.clientSecret,
			callbackURL: config.github.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({
				'github.id': profile.id
			}, function(err, user) {
				if (!user) {
					user = new User({
						name: profile.displayName,
						avatar: profile._json.avatar_url + "size=73",
						provider: 'github'
					});
					user.save(function(err) {
						if (err) console.log(err);
						return done(err, user);
					});
				} else {
					return done(err, user);
				}
			});
		}
	));

	//Use linkedin strategy
	passport.use(new LinkedInStrategy({
			clientID: config.linkedin.clientID,
			clientSecret: config.linkedin.clientSecret,
			callbackURL: config.linkedin.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({
				'linkedin.id': profile.id
			}, function(err, user) {
				if (!user) {
					user = new User({
						name: profile.displayName,
						avatar: profile._json.pictureUrl,
						provider: 'linkedin'
					});
					user.save(function(err) {
						if (err) console.log(err);
						return done(err, user);
					});
				} else {
					return done(err, user);
				}
			});
		}
	));

	//Use google strategy
	passport.use(new GoogleStrategy({
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL: config.google.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({
				'google.id': profile.id
			}, function(err, user) {
				if (!user) {
					user = new User({
						name: profile.displayName,
						provider: 'google',
						avatar: profile._json.picture + "?sz=73"
					});
					user.save(function(err) {
						if (err) console.log(err);
						return done(err, user);
					});
				} else {
					return done(err, user);
				}
			});
		}
	));
};