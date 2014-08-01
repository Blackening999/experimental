var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    text: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    posted_at: {
        type: Date,
        default: Date.now
    }
});

exports.Comment = mongoose.model('Comment', schema);