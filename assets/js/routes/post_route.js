Blog.PostRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        this._super(controller, model);
        controller.setProperties({
            user: this.modelFor('application'),
            authenticated: this.controllerFor('application').get("userAuthenticated")
        });
    },
    model: function(params) {
        return this.store.find('post', params["post_id"]);
    },
    actions: {
        willTransition: function (transition) {
            var controller = this.get('controller');
            if (controller.get('commentText') && controller.get('commentText').length > 1
                && !confirm("Are you sure you want to leave your comment unsent?")) {
                transition.abort();
            } else {
                this.controllerFor('login').set('toTransition', { route: 'post', id: controller.get('model.id') });
                return true;
            }
        }
    }
});