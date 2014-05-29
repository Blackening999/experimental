var Post = require('models/post').Post;
var HttpError = require('error').HttpError;
var async = require('async');

exports.get = function (req, res) {
	Post.find({}, function (err, posts) {
		if (err) throw new HttpError(err);
		res.send(JSON.stringify({ posts: posts }));
	})
};

exports.post = function(req, res) {
	Post.create(req.body.post, function(err, post) {
		if (err) new HttpError(res);
		res.send(JSON.stringify({ post: post }));
	})
};

exports.put = function(req, res) {
	Post.update({_id: req.params._id}, req.body.post, function(err, updateRes) {
		if (err) new HttpError(res);
		res.send(JSON.stringify(updateRes));
	});
};

exports.del = function (req, res) {
	Post.findById(req.params._id, function(err, post) {
		if (err) new HttpError(res);
		post.remove(function(err, removeRes) {
			if (err) new HttpError(res);
			res.send(JSON.stringify({ post: removeRes }));
		});
	});
};
