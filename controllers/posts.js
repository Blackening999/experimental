var mongoose = require('mongoose'),
    async = require('async'),
    HttpError = require('error').HttpError,
    Post = mongoose.model('Post'),
    _ = require('underscore');

exports.get = function (req, res) {
    Post.find({}, function (err, posts) {
        if (err) new HttpError(err);
        res.send(JSON.stringify({ posts: posts }));
    })
};

exports.post = function (req, res) {
    Post.create(req.body.post, function (err, post) {
        if (err) new HttpError(err);
        res.send(JSON.stringify({ post: post }));
    })
};

exports.put = function (req, res) {
    Post.update({_id: req.params._id}, req.body.post, function (err, updatedRes) {
        if (err) new HttpError(err);
        res.send(JSON.stringify(updatedRes));

    });
};

exports.del = function (req, res) {
    Post.findById(req.params._id, function (err, post) {
        if (err) new HttpError(err);
        post.remove(function (err, removeRes) {
            if (err) new HttpError(err);
            res.send(JSON.stringify({ post: removeRes }));
        });
    });
};