var mongoose = require('mongoose'),
    async = require('async'),
    HttpError = require('error').HttpError,
    Comment = mongoose.model('Comment'),
    _ = require('underscore');

exports.get = function (req, res) {
    Comment.find({}, function (err, comments) {
        if (err) throw new HttpError(err);
        res.send(JSON.stringify({ comments: comments }));
    })
};

exports.post = function(req, res) {
    Comment.create(req.body.comment, function(err, comment) {
        if (err) new HttpError(err);
        res.send(JSON.stringify({ comment: comment._doc }));
    })
};

exports.put = function(req, res) {
    Comment.update({ _id: req.params._id }, req.body.comment, function(err, updateRes) {
        if (err) new HttpError(err);
        res.send(JSON.stringify(updateRes));
    });
};

exports.del = function (req, res) {
    Comment.findById(req.params._id, function(err, comment) {
        if (err) new HttpError(err);
        comment.remove(function(err, removeRes) {
            if (err) new HttpError(err);
            res.send(JSON.stringify({ comment: removeRes }));
        });
    });
};