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
	this.route('login');
});

Blog.ApplicationRoute = Ember.Route.extend({
	beforeModel: function(transition) {
		console.log(transition);
		if (!!window.error) {
			this.transitionTo("login");
		}
	},
	model: function() {
		var user = {
			name: window.user ? window.user.name : "Guest",
			avatar: window.user ? window.user.avatar : "",
			provider: window.user ? window.user.provider : ""
		};
		console.log(user);
		window.user = null;
//        if (!!window.toRoute) this.transitionTo(window.toRoute);
		return this.store.createRecord('user', user);
	}
});
//App.ProtectedRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin); protected route

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
	model: function() {
		return this.store.createRecord("post");
	}
});

Blog.ProjectsCreateRoute = Ember.Route.extend(Blog.CreateUnitMixin, {
	model: function() {
		return this.store.createRecord("project");
	}
});

//Blog.ContactsCreateRoute = Ember.Route.extend(Blog.CreateUnitMixin, {
//	model: function() {
//		return this.store.createRecord("contact");
//	}
//});

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