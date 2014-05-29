var Project = require('models/project').Project;
var HttpError = require('error').HttpError;
var async = require('async');

exports.get = function(req, res) {
	Project.find({}, function(err, projects) {
		if (err) throw new HttpError(err);
		res.send(JSON.stringify({ projects: projects }));
	})
};

exports.post = function(req, res) {
	Project.create(req.body.project, function(err, project) {
		if (err) new HttpError(res);
		res.send(JSON.stringify({ project: project }));
	})
};

exports.put = function(req, res) {
	Project.update({_id: req.params._id}, req.body.project, function(err, updateRes) {
		if (err) new HttpError(res);
		res.send(JSON.stringify(updateRes));
	});
};

exports.del = function (req, res) {
	Project.findById(req.params._id, function(err, project) {
		if (err) new HttpError(res);
		project.remove(function(err, removeRes) {
			if (err) new HttpError(res);
			res.send(JSON.stringify({ project: removeRes }));
		});
	});
};