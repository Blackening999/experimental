Blog.ProjectsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('projects')
    }
});