require('ember');
require('ember_data');
require('custom_prefs');


//Ember.Application.initializer({
//	name: 'authentication',
//	initialize: function (container, application) {
//		container.register('authenticator:googleplus', Blog.GooglePlusAuthenticator);
//		container.register('authenticator:facebook', Blog.FacebookAuthenticator);
////		container.register('authenticator:twitter', Blog.TwitterAuthenticator);
//		container.register('authenticator:github', Blog.GithubAuthenticator);
//		//here and hereafter comments in the auth modules needs only to give token to server, these comments marked with //*{oat}
////		container.register('authorizer:custom', Blog.CustomAuthorizer);//*{oat}
//		Ember.SimpleAuth.setup(container, application, {
////			authorizerFactory: 'authorizer:custom'//*{oat}
//		});
//	}
//});

Ember.Router.reopen({
	didTransition: function(data) {
		this._super(data);
		setTimeout(function() {
			//libs reconfiguration
			custom_prefs.init();
		}, 100);
	}
});

window.Blog = Ember.Application.create({
	LOG_TRANSITIONS: true
});

require('mixins');

Blog.RESTAdapter = DS.RESTAdapter.extend({
	url: 'localhost:5000',
	serializeId: function(id) {
		return id.toString();
	}
});

Blog.PostSerializer = DS.RESTSerializer.extend({
	primaryKey: function() {
		return '_id';
	}.property()
});

Blog.ProjectSerializer = DS.RESTSerializer.extend({
	primaryKey: function() {
		return '_id';
	}.property()
});

Blog.ContactSerializer = DS.RESTSerializer.extend({
	primaryKey: function() {
		return '_id';
	}.property()
});

Blog.Store = DS.Store.extend({
	revision: 12,
	adapter: DS.RESTAdapter
});