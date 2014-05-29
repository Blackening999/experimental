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
if (window.location.search.indexOf("?test") !== -1) {
  document.write(
    '<div id="qunit"></div>' +
    '<div id="qunit-fixture"></div>' +
    '<div id="ember-testing-container">' +
    '  <div id="ember-testing"></div>' +
    '</div>' +
    '<link rel="stylesheet" href="tests/runner.css">' +
    '<link rel="stylesheet" href="tests/vendor/qunit.css">' +
    '<script src="tests/vendor/qunit.js"></script>' +
    '<script src="tests/tests.js"></script>'
  )
}

Blog.PaginationPageComponent = Ember.Component.extend({
	isCurrent: function() {
		return this.get('currentPage') == this.get('page')
	}.property('currentPage', 'page'),
	tagName: 'li',
	classNameBindings: ['isCurrent:disabled', 'isCurrent:sel'],
	actions: {
		pageClicked: function() {
			return this.get('parentView').send('goToPage', this.get('page'));
		}
	}
});
Blog.PaginationPanelComponent = Ember.Component.extend({
	hasPrevious: function() {
		return this.get('page') > 1
	}.property('page'),
	hasNext: function() {
		return this.get('page') < this.get('pages')
	}.property('page', 'pages'),
	lastPage: Ember.computed.alias('pages'),
	visiblePages: function() {
		var pages = this.get('pages');
		var page = this.get('page');

		function finish(start, limit) {
			return start + limit ;
		}

		var limit = pages < 5 ? pages : 5;
		var start = page - Math.floor(parseInt(limit / 2));
		if (finish(start, limit) > pages) { start = pages - limit + 1 };
		if (start < 1) start = 1;

		var results = [];
		for (var i = start; i < finish(start, limit); i++) {
			results.push(i);
		}
		return results;

	}.property('page', 'pages'),
	showBefore: function() {
		return this.get('visiblePages.firstObject') > 3
	}.property('visiblePages.[]'),
	showAfter: function() {
		return Math.abs(this.get('lastPage') - this.get('visiblePages.lastObject') > 2)
	}.property('visiblePages.[]', 'lastPage'),
	actions: {
		goToNextPage: function() {
			if (this.get('hasNext')) return this.incrementProperty('controller.page')
		},
		goToPreviousPage: function() {
			if (this.get('hasPrevious')) return this.decrementProperty('controller.page')
		},
		goToPage: function(pageNumber) {
			if (pageNumber >= 1 && pageNumber <= this.get('lastPage')) {
				this.set('controller.page', pageNumber);
			}
		}
	}
});
Blog.PostFullComponent = Ember.Component.extend({
	editMode: false,
	actions: {
		startEditing: function() {
			this.set("editMode", true);
		},
		completeEditing: function() {
			this.set("editMode", false);
			this.sendAction("completeEditing", this.get("post.model"));
		},
		uploadFile: function(file) {
			this.set("post.cover", file);
		}
	}
});
Blog.PostThumbComponent = Ember.Component.extend({
	actions: {
	removePost: function() {
			this.sendAction("removePost", this.get("post"));
		}
	}
});

Blog.ProjectFullComponent = Ember.Component.extend({
	editMode: false,
	actions: {
		startEditing: function() {
			this.set("editMode", true);
		},
		completeEditing: function() {
			this.set("editMode", false);
			this.sendAction("completeEditing", this.get("project.model"));
		},
		uploadFile: function(file) {
			this.set("project.cover", file);
		},
		removeProject: function() {
			this.sendAction("removeProject", this.get("project.model"));
		}
	}
});
Blog.IndexController = Ember.ArrayController.extend({
	logo: '',
	javascriptCreativityCover: '',
	frontendNewsCover: '',
	designHintsCover: '',
	recentProjects: function() {
		return this.get('content').slice(0, 6);
	}.property('content.[]')
});
Blog.PostController = Ember.ObjectController.extend({
	actions: {
		editPost: function(post) {
			post.save().then(function(data) {}, function(reason) {
				console.log("Failed to update post. Reason: " + reason);
				post.rollback();
			})
		}
	}
});
Blog.PostsIndexController = Ember.ArrayController.extend(Blog.PaginatableMixin, {
	sortProperties: ["postedAt"],
	sortAscending: true,
	page: 1,
	perPage: 8,
	showPagination: Ember.computed.gt('pages', 1),
	postsChunk: Ember.computed.alias('paginatedContent.length'),
	firstColumn: function() {
		return this.chunkContent("first");
	}.property('postsChunk', 'page'),
	secondColumn: function() {
		return this.chunkContent("second");
	}.property('postsChunk', 'page'),
	chunkContent: function(type) {
		var chunk = this.get('postsChunk'), content = this.get('paginatedContent'), start = 0, end = Math.floor(chunk / 2);
		if (chunk % 2 == 0) {
			return type == "first" ? content.slice(start, end) : content.slice(end, chunk);
		}
		return type == "first" ? content.slice(start, end + 1) : content.slice(end + 1, chunk);
	},
	actions: {
		removePost: function(post) {
			post.deleteRecord();
			post.save().then(function(data) {}, function(reason) {
				console.log("Failed to delete post. Reason: " + reason);
				post.rollback();
			});
		}
	}
});
Blog.ProjectController = Ember.ObjectController.extend({
	actions: {
		editProject: function(project) {
			project.save().then(function(data) {}, function(reason) {
				console.log("Failed to update project. Reason: " + reason);
				project.rollback();
			})
		},
		removeProject: function(project) {
			var controller = this;
			project.deleteRecord();
			project.save().then(function(data) {
				controller.transitionToRoute("/projects");
			}, function(reason) {
				console.log("Failed to delete project. Reason: " + reason);
				project.rollback();
			});
		}
	}
});
Blog.ProjectsIndexController = Ember.ArrayController.extend({
	mixRules: ['size-3', 'size-3-half', 'size-3-half', 'size-3-half', 'size-3-half', 'size-2-half', 'size-1', 'size-1', 'size-1-half', 'size-1-half'],
	sortAscending: true,
	currentClass: function() {
		return this.get('mixRules');
	},
	mixedContent: function() {
		var content = this.get('content'), size = content.get('length');
		for (var i = 0; i < size; i++) {
			var m = i == 0 ? '' : ' m' + i, pos = i;
			if (pos > 9) pos -= 10;
			content.objectAt(i).set('currentClass', 'js-image ' + this.get('mixRules')[pos] + m);
		}
		return content.slice(0, size);
	}.property('[].content')
});

Blog.Contact = DS.Model.extend({
	name: DS.attr('string'),
	direction: DS.attr('string'),
	age: DS.attr(),
	skills: DS.attr(),
	photo: DS.attr('string', {defaultValue: "/img/500x400.gif"}),
	portfolio: DS.attr()
});

Blog.Post = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	cover: DS.attr('string', {defaultValue: "/img/500x400.gif"}),
	text: DS.attr('string'),
	category: DS.attr('string'),
	items: DS.attr(),
	postedAt: DS.attr('string', { defaultValue: new Date() })
});
Blog.Project = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	text: DS.attr('string'),
	cover: DS.attr('string', {defaultValue: "/img/500x400.gif"}),
	items: DS.attr()
});
Blog.EditTextView = Ember.TextField.extend({
	didInsertElement: function() {
		this.$().focus();
	}
});

Ember.Handlebars.helper('edit-text', Blog.EditTextView);
Blog.EditTextAreaView = Ember.TextArea.extend({
	didInsertElement: function() {
		this.$().focus();
	}
});

Ember.Handlebars.helper('edit-textarea', Blog.EditTextAreaView);
Blog.FileUploadView = Ember.TextField.extend({
	upload: 'uploadFile',
	type: 'file',
	attributeBindings: ['name'],
	change: function(evt) {
		var self = this;
		var input = evt.target;
		if (input.files && input.files[0]) {
			var reader = new FileReader(),
				file = input.files[0],
				fileSize = file.size;
			if (fileSize < 5242880) {
				reader.onload = function() {
					self.sendAction("upload", reader.result);
				};
				reader.readAsDataURL(file);
			} else {
				input.value = "";
				alert("File is too big! 5MB max!")
			}
		}
	}
});
Blog.CreateUnitMixin = Ember.Mixin.create({
	actions: {
		createUnit: function() {
			var _this = this, type = this.get("currentModel.type.typeKey");
			var controller = _this.get('controller'),
				defaultParams = ['title', 'description', 'category', 'cover', 'text'], params = {};
			for (var i = 0; i < defaultParams.length; i++) {
				if (controller.hasOwnProperty(defaultParams[i])) {
					params[defaultParams[i]] = controller.get(defaultParams[i]).trim();
				}
			}

			var unit = controller.store.createRecord(type, params);
			controller.setProperties({ title: "", description: "", category: "", text: "", uploadingFile: "" });
			unit.save().then(function() {
				_this.transitionTo("/" + type + "s");
			}, function(reason) {
				console.log("Failed to create " + type + ". Reason: " + reason);
				unit.rollback();
			});
		}
	}
});
Blog.PaginatableMixin = Ember.Mixin.create({
	paginatedContent: function() {
		var page = this.get('page');
		var perPage = this.get('perPage');
		var start = (page - 1) * perPage;
		var end = page * perPage;
		return this.get('arrangedContent').slice(start, end)
	}.property('arrangedContent.[]', 'page', 'perPage'),
	pages: function() {
		var result = parseInt(this.get('content.length')) / this.get('perPage');
		if (this.get('content.length') % this.get('perPage') > 0) ++result;
		return Math.floor(result);
	}.property('content.[]', 'perPage')
});