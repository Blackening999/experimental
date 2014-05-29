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
	text: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	items: {
		type: Array,
		required: false
	},
	postedAt: {
		type: Date,
		default: Date.now
	}
});

exports.Post = mongoose.model('Post', schema);