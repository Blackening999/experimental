Blog.ProjectFullComponent = Ember.Component.extend(Blog.CheckAccessComponentMixin, {
	editMode: false,
	actions: {
		startEditing: function() {
			this.set("editMode", true);
		},
		completeEditing: function() {
			this.set("editMode", false);
			this.sendAction("completeEditing", this.get("project.model"));
		},
		uploadFile: function(file) {
			this.set("project.cover", file);
		},
		removeProject: function() {
			this.sendAction("removeProject", this.get("project.model"));
		}
	}
});