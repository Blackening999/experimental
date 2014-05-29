Blog.PostThumbComponent = Ember.Component.extend({
	actions: {
	removePost: function() {
			this.sendAction("removePost", this.get("post"));
		}
	}
});
