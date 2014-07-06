Blog.LoginRoute = Ember.Route.extend({
//	beforeModel: function(transition) {
//		console.log(transition);
//
//
//	},
    model: function() {
        return this.modelFor('application');
    }
//	setupController: function(controller, model) {
//		controller.set('errorMessage', null);
//	}
});