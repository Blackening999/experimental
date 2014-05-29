require('ember');
require('ember_data');
require('custom_prefs');

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
