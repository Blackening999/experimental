var mongoose = require('libs/mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	cover: {
		type: String
	},
	items: {
		type: Array,
		required: false
	},
	text: {
		type: String,
		required: true
	}
});

exports.Project = mongoose.model('Project', schema);