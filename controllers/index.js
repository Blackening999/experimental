var mongoose = require('mongoose'),
	async = require('async'),
	_ = require('underscore');


exports.render = function(req, res) {
	res.render('index', {
		user: req.user ? JSON.stringify(req.user) : "null",
		error: req.error ? JSON.stringify(req.user) : "null",
        toRoute: req.toRoute || "null"
	});
};