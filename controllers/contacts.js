var mongoose = require('mongoose'),
	async = require('async'),
	HttpError = require('error').HttpError,
	Contact = mongoose.model('Contact'),
	_ = require('underscore');


exports.get = function(req, res) {
	Contact.find({}, function(err, contacts) {
		if (err) throw new HttpError(err);
		res.send(JSON.stringify({ contacts: contacts }));
	})
};

exports.post = function(req, res) {
	Contact.create(req.body.contact, function(err, contact) {
		if (err) new HttpError(res);
		res.send(JSON.stringify({ contact: contact }));
	});
};

exports.put = function(req, res) {
	Contact.update({_id: req.params._id}, req.body.contact, function(err, updateRes) {
		if (err) new HttpError(res);
		res.send(JSON.stringify(updateRes));
	});
};

exports.del = function (req, res) {
	Contact.findById(req.params._id, function (err, contact) {
		if (err) new HttpError(res);
		contact.remove(function (err, removeRes) {
			if (err) new HttpError(res);
			res.send(JSON.stringify({ contact: removeRes }));
		});
	});
};