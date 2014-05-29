Blog.ProjectController = Ember.ObjectController.extend({
	actions: {
		editProject: function(project) {
			project.save().then(function(data) {}, function(reason) {
				console.log("Failed to update project. Reason: " + reason);
				project.rollback();
			})
		},
		removeProject: function(project) {
			var controller = this;
			project.deleteRecord();
			project.save().then(function(data) {
				controller.transitionToRoute("/projects");
			}, function(reason) {
				console.log("Failed to delete project. Reason: " + reason);
				project.rollback();
			});
		}
	}
});