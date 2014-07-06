Blog.ProjectsCreateRoute = Ember.Route.extend(Blog.CreateUnitMixin, {
    model: function() {
        return this.store.createRecord("project");
    }
});