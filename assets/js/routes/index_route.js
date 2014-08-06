Blog.IndexRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        this._super(controller, model);
        controller.set('posts', this.store.find('post'));
    },
    model: function() {
        return this.store.find('project');
    }
});