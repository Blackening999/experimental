Blog.Router.map(function() {
	this.resource('posts', { path: '/posts'}, function() {
		this.resource('post', { path: ':post_id' }, function() {
			this.route('edit');
//			this.route('comment');
		});
		this.route('create');
	});
	this.resource('projects', { path: '/projects'}, function() {
		this.resource('project', { path: ':project_id'}, function() {
			this.route('edit');
		});
		this.route('create');
	});
	this.resource('contacts', { path: '/contacts'}, function() {
		this.resource('contact', { path: ':contact_id'}, function() {
			this.route('edit');
			this.route('review');
		} );
	});
//	this.route('account');
});

Blog.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('project');
	}
});

Blog.PostsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('post');
	}
});

Blog.PostsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('posts');
	}
});

Blog.PostRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('post', params["post_id"]);
	}
});

Blog.PostsCreateRoute = Ember.Route.extend(Blog.CreateUnitMixin, {
	actions: {
		uploadFile: function(params) {
			this.set('controller.cover', params);
		}
	}
});

Blog.ProjectsCreateRoute = Ember.Route.extend(Blog.CreateUnitMixin, {
	actions: {
		uploadFile: function(params) {
			this.set('controller.cover', params);
		}
	}
});

Blog.PostEditRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('post');
	}
});

Blog.ProjectsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('project');
	}
});

Blog.ProjectsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('projects')
	}
});

Blog.ProjectRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('project', params["project_id"]);
	}
});

Blog.ContactsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('contact');
	}
});

Blog.ContactsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('contacts');
	}
});

Blog.ContactRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('contact', params["contact_id"]);
	}
});