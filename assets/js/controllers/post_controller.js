Blog.PostController = Ember.ObjectController.extend({
	actions: {
		editPost: function(post) {
			post.save().then(function(data) {}, function(reason) {
				console.log("Failed to update post. Reason: " + reason);
				post.rollback();
			})
		}
	}
});