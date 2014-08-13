var mongoose = require('libs/mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    skype: {
        type: String
    },
    googleplus: {
        type: String
    },
    linkedin: {
        type: String
    },
    facebook: {
        type: String
    },
    github: {
        type: String
    },
    twitter: {
        type: String
    },
    credentials: {
      type: String,
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