var mongoose = require('libs/mongoose'),
	Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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
    comment_ids: Array,
    posted_at: {
		type: Date
	}
});

var textSearch = require('mongoose-text-search');
schema.plugin(textSearch);
schema.index({
    title        : "text",
    description  : "text",
    text         : "text"
}, {
    name: "best_match_index",
    weights: {
        title: 5,
        description: 4
    }
});

exports.Post = mongoose.model('Post', schema);