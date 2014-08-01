var mongoose = require('mongoose'),
	async = require('async'),
	_ = require('underscore'),
    HttpError = require('error').HttpError,
    Post = mongoose.model('Post');


exports.render = function(req, res) {
	res.render('index', {
		user: req.user ? JSON.stringify(req.user) : "null",
		error: req.error ? JSON.stringify(req.user) : "null",
        toRoute: req.toRoute || "null",
        message: req.message || "null"
	});
};

exports.search = function (req, res) {
    Post.textSearch(req.params.keyword, {
        limit: 20
    }, function (err, output) {
        if (err) throw new HttpError(err);
        res.send({
            results: _.map(output.results, function (item) {
                var property = item.obj;
                return {
                    title       : property.get('title'),
                    description : property.get('description'),
                    text        : property.get('text')
                };
            })
        });
    });
};