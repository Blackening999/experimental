var mongoose = require('libs/mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	direction: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	skills: {
		type: Array,
		required: true
	},
	portfolio: {
		type: String,
		required: true
	},
	photo: {
		type: String
	}
});

exports.Contact = mongoose.model('Contact', schema);