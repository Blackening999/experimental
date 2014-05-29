Blog.PostFullComponent = Ember.Component.extend({
	editMode: false,
	actions: {
		startEditing: function() {
			this.set("editMode", true);
		},
		completeEditing: function() {
			this.set("editMode", false);
			this.sendAction("completeEditing", this.get("post.model"));
		},
		uploadFile: function(file) {
			this.set("post.cover", file);
		}
	}
});