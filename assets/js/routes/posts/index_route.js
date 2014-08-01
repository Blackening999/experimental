Blog.PostsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('posts');
    }
});