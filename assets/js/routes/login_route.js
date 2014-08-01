Blog.LoginRoute = Ember.Route.extend({
    beforeModel: function(transition) {
        if (!this.controllerFor('application').get('userAuthenticated')) {
            var loginController = this.controllerFor('login');
            loginController.set('previousTransition', transition);
            this.transitionTo('login');
        }
    },
    model: function() {
        return this.modelFor('application');
    }
});