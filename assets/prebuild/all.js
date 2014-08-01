require('ember');
require('ember_data');
require('custom_prefs');

Ember.FEATURES["query-params"] = true;

Ember.Router.reopen({
    didTransition: function (data) {
        this._super(data);
        setTimeout(function () {
            //libs reconfiguration
            custom_prefs.init();
        }, 100);
    }
});

window.Blog = Ember.Application.create({
    LOG_TRANSITIONS: true
});

require('mixins');

Blog.ActiveModelAdapter = DS.ActiveModelAdapter.extend({
    url: 'localhost:5000',
    serializeId: function (id) {
        return id.toString();
    }
});

Blog.ApplicationSerializer = DS.ActiveModelSerializer.extend({

});


Blog.PostSerializer = DS.ActiveModelSerializer.extend(Blog.HasManySerializerMixin, {
    primaryKey: function () {
        return '_id';
    }.property(),
////    extractSingle: function (store, type, payload, id) {
////        var comments = payload.post.comments,
////            commentIds = comments.mapBy('id');
////
////        payload.comments = comments;
////        payload.post.comments = commentIds;
////
////        return this._super.apply(this, arguments);
////    },
//    attrs: {
//        comments: {serialize: 'ids', deserialize: 'ids'}
//    },
    serializeHasMany: function(record, json, relationship) {
        var key = relationship.key;
        var json_key = key.singularize().decamelize() + '_ids';

        var relationshipType = DS.RelationshipChange.determineRelationshipType(
            record.constructor, relationship);

        if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
            json[json_key] = Ember.get(record, key).mapBy('id');
        }
    }
//    serializeHasMany: function(record, json, relationship) {
//        var key = relationship.key;
//        var json_key = key.singularize().decamelize() + '_ids';
//
//        var relationshipType = DS.RelationshipChange.determineRelationshipType(
//            record.constructor, relationship);
//
//        if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
//            json[json_key] = Ember.get(record, key).mapBy('id');
//        }
//    }
});

Blog.ProjectSerializer = DS.ActiveModelSerializer.extend({
    primaryKey: function () {
        return '_id';
    }.property()
});

Blog.ContactSerializer = DS.ActiveModelSerializer.extend({
    primaryKey: function () {
        return '_id';
    }.property()
});

Blog.UserSerializer = DS.ActiveModelSerializer.extend({
    primaryKey: function () {
        return '_id';
    }.property()
    //,
//    serializeHasMany: function(record, json, relationship) {
//        var key = relationship.key;
//        var json_key = key.singularize().decamelize() + '_ids';
//
//        var relationshipType = DS.RelationshipChange.determineRelationshipType(
//            record.constructor, relationship);
//
//        if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
//            json[json_key] = Ember.get(record, key).mapBy('id');
//        }
//    }
});

Blog.CommentSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: function () {
        return '_id';
    }.property()//,
//    attrs: {//{ embedded: 'always' },
//        user: { embedded: 'always' }, //{serialize: 'id', deserialize: 'id'},
//        post: { embedded: 'always' } //{serialize: 'id', deserialize: 'id'}
//    }
});

Blog.Store = DS.Store.extend({
    revision: 12,
    adapter: DS.ActiveModelAdapter
});
Blog.Router.map(function() {
	this.resource('posts', { path: '/posts'}, function() {
		this.resource('post', { path: ':post_id' }, function() {
			this.route('edit');
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
    this.resource('search', { path: '/search'}, function () {
        this.route('results', { path: ':keyword'} );
    });
	this.route('login');
    this.route('catchall', { path: '/*wildcard'} )
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

Ember.Woof = Ember.ArrayProxy.extend({
    content: Ember.A(),
    timeout: 2000,
    pushObject: function(object) {
        object.typeClass = 'alert-' + object.type;
        this._super(object);
    },
    danger: function(message) {
        this.pushObject({
            type: 'danger',
            message: message
        });
    },
    warning: function(message) {
        this.pushObject({
            type: 'warning',
            message: message
        });
    },
    info: function(message) {
        this.pushObject({
            type: 'info',
            message: message
        });
    },
    success: function(message) {
        this.pushObject({
            type: 'success',
            message: message
        });
    }
});
Blog.ModalDialogComponent = Ember.Component.extend({
    actions: {
        close: function() {
            return this.sendAction();
        }
    },
    didInsertElement: function() {
        $('#modalDialog').modal({
            'show': true
        });
    },
    willDestroyElement: function() {
        $('#modalDialog').modal('hide');
    }
});
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
		return this.get('visiblePages.firstObject') > 3;
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
Blog.PostCategoryComponent = Ember.Component.extend({
    tagName: 'li',
    isActive: function () {
        return this.get('staticCategory') === this.get('currentCategory')
    }.property('currentCategory', 'staticCategory'),
    classNameBindings: ['isActive:active']
});

Blog.PostCommentComponent = Ember.Component.extend(Blog.EditComponentMixin, {
    dateDifference: function () {
        return new Date(new Date() - this.get('unit.postedAt')).getMinutes();
    }.property('unit.postedAt'),
    user: function () {
        var component = this, commentUser = component.get('unit.user');
        commentUser.then(function (usr) {
            component.set('editAvailable', usr.get('id') === component.get('currentUser.id')
            && (component.get('dateDifference') < 60));
        });
        return commentUser;
    }.property('unit.user', 'currentUser', 'dateDifference'),
    actions: {
        deleteComment: function () {
           this.sendAction('deleteComment', this.get('unit'));
        }
    }
});
Blog.PostFullComponent = Ember.Component.extend(Blog.EditComponentMixin, Blog.CheckAccessComponentMixin, {
	actions: {
		uploadFile: function(file) {
			this.set('unit.cover', file);
		}
	}
});
Blog.PostThumbComponent = Ember.Component.extend(Blog.CheckAccessComponentMixin, {
	actions: {
        removePost: function() {
                this.sendAction("removePost", this.get("post"));
            }
        }
});

Blog.ProjectFullComponent = Ember.Component.extend(Blog.CheckAccessComponentMixin, {
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
Blog.WysiwygEditorComponent = Ember.Component.extend({
    classNames: ['wysiwyg-editor'],
    btnSize: 'btn-xs',
    height: 120,

    willDestroyElement: function() {
        this.$('textarea').destroy();
    },

    didInsertElement: function() {
        var btnSize = this.get('btnSize');
        var height = this.get('height');

        this.$('textarea').summernote({
            height: height,
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['insert', ['link']],
                ['table', ['table']],
                ['help', ['help']]
            ]
        });

        var content = this.get('content');
        this.$('textarea').code(content);
        this.$('.btn').addClass(btnSize);
    },

    keyUp: function() {
        this.doUpdate();
    },

    click: function() {
        this.doUpdate();
    },

    doUpdate: function() {
        var content = this.$('.note-editable').html();
        this.set('content', content);
    }
});
Blog.XWoofComponent = Ember.Component.extend({
    classNames: 'woof-messages',
    messages: Ember.computed.alias('woof')
});
Blog.XWoofMessageComponent = Ember.Component.extend({
    classNames: ['x-woof-message-container'],
    classNameBindings: ['insertState'],
    insertState: 'pre-insert',
    didInsertElement: function() {
        var self = this;
        self.$().bind('webkitTransitionEnd', function(event) {
            if (self.get('insertState') === 'destroyed') {
                self.woof.removeObject(self.get('message'));
            }
        });
        Ember.run.later(function() {
            self.set('insertState', 'inserted');
        }, 250);

        if (self.woof.timeout) {
            Ember.run.later(function() {
                self.set('insertState', 'destroyed');
            }, self.woof.timeout);
        }
    },

    click: function() {
        var self = this;
        self.set('insertState', 'destroyed');
    }
});
Blog.ApplicationController = Ember.ObjectController.extend({
	userAuthenticated: function() {
		return !(this.get("model.name") === "Guest");
	}.property("name"),
    socialIcons: {

    },
    actions: {
        logout: function() {
            var _this = this;
            Ember.$.ajax({
                url:         '/signout',
                type:        'GET',
                contentType: 'application/json'
            }).then(function(res) {
                _this.get("model").setProperties({
                    name: "Guest",
                    email: "",
                    isAdmin: false,
                    isOwner: false,
                    avatar: ""
                });
                _this.transitionToRoute(res.toRoute);
            }, function(err) {
                _this.woof.danger(err.responseText);
            });
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
Blog.LoginController = Ember.Controller.extend({
    userEmail: "",
    userPassword: "",
    loginFailed: false,
    isProcessing: false,
    isSlowConnection: false,
    timeout: null,
	actions: {
        authorize: function() {
            var _this = this, validationResults = _this.validate();
            if (!validationResults.status) {
                _this.woof.danger(validationResults.message);
                return;
            }
            _this.set('isProcessing', true);
            _this.set('timeout', setTimeout(function () {
                _this.woof.warning("The request seems to be taking more time than usual, please wait.");
            }, 5000));
            Ember.$.ajax({
                url: '/users/session',
                type: 'POST',
                data: JSON.stringify({
                    email: this.get("userEmail"),
                    password: this.get("userPassword")
                }),
                contentType: 'application/json'
            }).then(function(res) {
                Ember.run(function () {
                    _this.reset();
                    if (res.error) {
                        _this.woof.danger(res.error);
                        return;
                    }
                    var model = _this.get("model");
//                model.set("content", $this.store.find('user', user.id))
                    model.setProperties({
                        id: res._id,
                        name: res.name,
                        email: res.email,
                        //comments: res.comment_ids, TODO: for future availability, there should be used something like extractSingle :)
                        isAdmin: res.is_admin,
                        isOwner: res.is_owner
                    });//this.store.find('user', user.id);
                    _this.woof.success("Wellcome, your majesty " + res.name);


                    var toTransition = _this.get('toTransition');
                    if (toTransition) {
                        _this.set('toTransition', null);
                        _this.transitionToRoute(toTransition.route, toTransition.id);
                    } else {
                        _this.transitionToRoute('application');
                    }
                });

            }, function (xhr, status, error) {
                Ember.run(function () {
                    _this.reset();
                    _this.woof.danger(error);
                });
            });
        }
	},
    reset: function() {
        clearTimeout(this.get("timeout"));
        this.set('isProcessing', false);
    },
    validate: function() {
        if (this.get("userEmail") === "" || this.get("userPassword") === "") {
            return { status: false, message: "Fill all fields first" };
        }
        return { status: true };

    }
});
Blog.ModalController = Ember.ObjectController.extend({
    actions: {
        close: function() {
            return this.send('closeModal');
        }
    }
});
Blog.PostController = Ember.ObjectController.extend(Blog.CheckAccessMixin, {
    comments: function () {
        return this.get('model.comments')
    }.property('model.@each.comments'),
    post: function () {
        return this.get('model');
    }.property('post'),
    user: function () {
        return this.get('user');
    }.property('user'),
    actions: {
        editPost: function (post) {
            var _this = this;
            post.save().then(function (data) {}, function (err) {
                _this.woof.danger(err.responseText);
                post.rollback();
            })
        },
        leaveComment: function () {
            var controller = this, user = controller.get('user'), post = controller.get('post');
            var comment = this.get('store').createRecord('comment', {
                text: controller.get('commentText'),
                user: user,
                post: post,
                postedAt: new Date()
            });
            comment.save().then(function (comment_res) {
                var comments = controller.get("comments");
                comments.pushObject(comment_res);
                post.save().then(function (post_res) {
                    controller.set("commentText", "");
                }, function (err) {
                    comments.popObject();
                    controller.woof.danger(err.responseText);
                });
            }, function (err) {
                comment.rollback();
                controller.woof.danger(err.responseText);
            });
        },
        editComment: function (comment) {
            var _this = this;
            comment.save().then(function (data) {}, function (err) {
                _this.woof.danger(err.responseText);
            });
        },
        deleteComment: function (comment) {
            var _this = this;
            comment.destroyRecord().then(function (data) {
                _this.get('post').save().then(function () {}, function (err) {
                    post.rollback();
                    _this.woof.danger(err.responseText);
                })
            }, function (err) {
                comment.rollback();
                _this.woof.danger(err.responseText);
            })
        }
    }
});


Blog.PostsController = Ember.ArrayController.extend(Blog.CheckAccessMixin, Blog.SearchMixin, Blog.SortableMixin, {});
Blog.PostsIndexController = Ember.ArrayController.extend(Blog.PaginatableMixin, Blog.CheckAccessMixin, Blog.SearchMixin, {
    needs: ['posts'],
    filteredContent: function () {
        return this.get('controllers.posts.filteredContent');
    }.property('controllers.posts.filteredContent', 'model'),
	sortProperties: ['postedAt'],
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
            var _this = this;
			post.deleteRecord();
			post.save().then(function(data) {}, function(err) {
                _this.woof.danger(err.responseText);
                post.rollback();
            });
		}
	}
});
Blog.ProjectController = Ember.ObjectController.extend(Blog.CheckAccessMixin, {
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
	mixRules: ['size-3', 'size-3-half', 'size-3-half', 'size-3-half', 'size-3-half', 'size-2-half', 'size-1', 'size-1',
        'size-1-half', 'size-1-half'],
	sortAscending: true,
	currentClass: function() {
		return this.get('mixRules');
	},
	mixedContent: function() {
		var content = this.get('model.content'), size = content.get('length');
		for (var i = 0; i < size; i++) {
			var m = i == 0 ? '' : ' m' + i, pos = i;
			if (pos > 9) pos -= 10;
			content.objectAt(i).set('currentClass', 'js-image ' + this.get('mixRules')[pos] + m);
		}
		return content.slice(0, size);
	}.property('model.content.@each')
});

Blog.SearchController = Ember.Controller.extend(Blog.SearchMixin, {})
Blog.SearchResultsController = Ember.ArrayController.extend({
    highlighted: function (key, value) {
        var lowered = value.toLowerCase(), keyword = this.get('keyword').toLowerCase(),
            startWord = lowered.indexOf(keyword), endWord = startWord + keyword.length ,
            word = value.substring(startWord, endWord), range = key === 'title'
                ? 0 : key === 'description'
                ? 15 : 100,
            beginning = "", ending = "";
        if (startWord < 0) {
            if (key !== 'text') return value;
            return "";
        } else {
            beginning = startWord < range || key === 'title'
                ? value.slice(range, startWord)
                : "..." + value.slice(startWord - range, startWord);
            ending = endWord + range > value.length || key === 'title'
                ? value.slice(endWord, value.length)
                : value.slice(endWord, endWord + range) + "...";
        }
        return beginning + "<span class='highlighted'>" + word + "</span>" + ending;

    },
    highlightedContent: function () {
        var _this = this;
        return this.get('arrangedContent').map(function (value, key) {
            return {
                title: _this.highlighted("title", value.get('title')),
                description: _this.highlighted("description", value.get('description')),
                text: _this.highlighted("text", value.get('text'))
            }
        });

    }.property('model.@each')
});
Ember.Handlebars.helper('capitalize', function(value) {
    return value.capitalize();
});
Ember.Handlebars.registerBoundHelper('date', function (date, format) {
    return moment(date).format(format);
});
Ember.Handlebars.registerBoundHelper( 'pluralize', function( number, options ) {
    var phraseMatch = ( options.hash.phrase || '{|s}' ).match( /(.*?)\{(.*?)\|(.*?)\}/),
        word = phraseMatch[ 1 ],
        singular = word + phraseMatch[ 2 ],
        plural = word + phraseMatch[ 3 ]
    return number == 1 ? singular : plural
});
Ember.Application.initializer({
    name: "registerWoofMessages",

    initialize: function(container, application) {
        application.register('woof:main', Ember.Woof);
    }
});

Ember.Application.initializer({
    name: "injectWoofMessages",

    initialize: function(container, application) {
        application.inject('controller', 'woof', 'woof:main');
        application.inject('component',  'woof', 'woof:main');
        application.inject('route',      'woof', 'woof:main');
    }
});
Blog.Comment = DS.Model.extend({
    text: DS.attr("string"),
    user: DS.belongsTo("user", { async: true }),
    post: DS.belongsTo("post", { async: true }),
    postedAt: DS.attr("date", { defaultValue: new Date() })
});

Blog.Contact = DS.Model.extend({
	name: DS.attr('string'),
	direction: DS.attr('string'),
	age: DS.attr('number'),
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
    postedAt: DS.attr('string', { defaultValue: new Date() }),
    comments: DS.hasMany("comment", { async: true })
});
Blog.Project = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	text: DS.attr('string'),
	cover: DS.attr('string', {defaultValue: "/img/500x400.gif"}),
	items: DS.attr()
});
Blog.User = DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string', { defaultValue: ""}),
	avatar: DS.attr('string'),
    isAdmin: DS.attr('boolean', { defaultValue: false} ),
    isOwner: DS.attr('boolean', { defaultValue: false} ),
	comments: DS.hasMany("comment", { async: true })
});
Blog.ApplicationRoute = Ember.Route.extend({
    model: function() {
        var isGuest = !window.user, user = isGuest
            ? { name: "Guest" }
            : {
                id       : window.user._id ,
                name     : window.user.name,
                email    : window.user.email,
                avatar   : window.user.avatar,
                provider : window.user.provider,
                isAdmin  : window.user.is_admin,
                isOwner  : window.user.is_owner
              };
        window.user = null;
        return isGuest ? this.store.createRecord('user', user) : this.store.find('user', user.id);
    },
    activate: function() {
        if (window.message) {
            this.woof.danger(window.message);
        }
        if (!!window.error) {
            this.transitionTo("login");
        }
    },
    actions: {
        openModal: function(modalName, model) {
            this.controllerFor(modalName).set('model', model);
            this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },
        closeModal: function() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }

});
Blog.CatchallRoute = Ember.Route.extend({});
Blog.ContactRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('contact', params["contact_id"]);
    }
});
Blog.ContactsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('contact');
    }
});
Blog.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('project');
    }
});
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
Blog.PostsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('post');
    }
});
Blog.ProjectRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('project', params["project_id"]);
    }
});
Blog.ProjectsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('project');
    }
});
Blog.ApplicationView = Ember.View.extend(Blog.DefaultAnimationMixin, {});
Blog.ContactsView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({y: 1000}, 1);
    },
    animateIn : function () {
        this.$().transition({y: 0}, 800, 'ease');
    }
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
	attributeBindings: ['name', 'data-type'],
	"data-type": "cover",
	change: function (evt) {
		var self = this;
		var input = evt.target;
		if (input.files && input.files[0]) {
			var reader = new FileReader(),
				file = input.files[0],
				fileSize = file.size;
			if (fileSize < 5242880) {
				reader.onload = function () {
					self.sendAction("upload", reader.result, self.$().attr("data-type"));
				};
				reader.readAsDataURL(file);
			} else {
				input.value = "";
				alert("File is too big! 5MB max!")
			}
		}
	}
});
Blog.IndexView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({y: -1000}, 1);
    },
    animateIn : function () {
        this.$().transition({y: 0}, 800, 'ease');
    }
});
Blog.InstagramWidgetView = Ember.View.extend(Blog.DefaultAnimationMixin, {
    tagName: 'ul',
    classNames: ['instagram-widget'],
    didInsertElement: function () {
        Ember.$.fn.spectragram.accessData = {
            accessToken: '227040449.c76926c.5051df00433345f88cf49553b1f43ac5',
            clientID: 'c76926ccc60c478aaafe1a785042ef4e'
        };
        this.$().spectragram('getUserFeed', {
            query: 'infi_',
            max: 4
        });

    }
});
Blog.LoginView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({perspective: '1000px', rotateY: '180deg'}, 1);
    },
    animateIn : function () {
        this.$().transition({perspective: '1000px', rotateY: '0deg'}, 'slow');
    }
});
Blog.PostView = Ember.View.extend(Blog.DefaultAnimationMixin, {});
Blog.PostsView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({x: 1000}, 1);
    },
    animateIn : function () {
        this.$().transition({x: 0}, 800, 'ease');
    }
});
Blog.ProjectView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({opacity: 0}, 1);
    },
    animateIn : function () {
        this.$().transition({opacity: 1}, 1000, 'ease');
    }
});
Blog.ProjectsView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({x: -1000}, 1);
    },
    animateIn : function () {
        this.$().transition({x: 0}, 800, 'ease');
    }
});
Blog.SearchResultsView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({x: -2000}, 1);
    },
    animateIn : function () {
        this.$().transition({x: 0}, 800, 'ease');
    }
});

Blog.SearchView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({x: 1000}, 1);
    },
    animateIn : function () {
        this.$().transition({x: 0}, 800, 'ease');
    }
});

//Blog.SocialIconView = Ember.View.extend({
//    tagName: "span",
//    mouseEnter: function (e) {
//        var el = Ember.$(e.target);
//        Ember.run(function () {
//            el.find("i").stop(true, true).delay(200).animate({
//                top: -60
//            }, 'fast', function () {
//                el
//                    .addClass('active')
//                    .css({
//                        top: 120
//                    })
//                    .animate({top: 0})
//            });
//        });
//
//    },
//    mouseLeave: function (e) {
//        var el = Ember.$(e.target);
//        Ember.run(function () {
//            el
//                .find('i')
//                .stop(true, true)
//                .animate({
//                    top: 0
//                })
//                .removeClass('active');
//        });
//
//
//    }
//});
//Blog.TwitterWidgetView = Ember.View.extend(Blog.DefaultAnimationMixin, {
//    classNames: ['twitter-widget'],
//    didInsertElement: function () {
//        var tweets = {
//        // Set twitter username, number of tweets & id/class to append tweets
//            user: 'Blackening999',
//            numTweets: 4,
//            appendTo: '.twitter-widget',
//
//            // core function of jqtweet
//            loadTweets: function() {
//                Ember.$.ajax({
//                    url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
//                    type: 'GET',
//                    dataType: 'jsonp',
//                    data: {
//                        screen_name: tweets.user,
//                        include_rts: true,
//                        count: tweets.numTweets,
//                        include_entities: true
//                    },
//                    success: function(data) {
//                        var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';
//                        // append tweets into page
//                        for (var i = 0; i < data.length; i++) {
//                            $(tweets.appendTo).append(
//                                html.replace('TWEET_TEXT', tweets.ify.clean(data[i].text) )
//                                    .replace(/USER/g, data[i].user.screen_name)
//                                    .replace('AGO', tweets.timeAgo(data[i].created_at) )
//                                    .replace(/ID/g, data[i].id_str)
//                            );
//                        }
//                    }
//
//                });
//
//            },
//
//
//            /**
//             * The Twitalinkahashifyer!
//             * http://www.dustindiaz.com/basement/ify.html
//             * Eg:
//             * ify.clean('your tweet text');
//             */
//            ify:  {
//                link: function(tweet) {
//                    return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
//                        var http = m2.match(/w/) ? 'http://' : '';
//                        return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
//                    });
//                },
//
//                at: function(tweet) {
//                    return tweet.replace(/\B[@?]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
//                        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
//                    });
//                },
//
//                list: function(tweet) {
//                    return tweet.replace(/\B[@?]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
//                        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
//                    });
//                },
//
//                hash: function(tweet) {
//                    return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
//                        return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
//                    });
//                },
//
//                clean: function(tweet) {
//                    return this.hash(this.at(this.list(this.link(tweet))));
//                }
//            } // ify
//
//
//        };
//        tweets.loadTweets();
//
//    }
//});
//Blog.ContactsCreateRoute = Ember.Route.extend(Blog.CreateUnitMixin, {
//	model: function() {
//		return this.store.createRecord("contact");
//	}
//});
Blog.ContactsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('contacts');
    }
});
Blog.PostEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('post');
    }
});
Blog.PostsCreateRoute = Ember.Route.extend(Blog.CreateUnitMixin, {
    model: function() {
        return this.store.createRecord("post");
    }
});
Blog.PostsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('posts');
    }
});
Blog.ProjectsCreateRoute = Ember.Route.extend(Blog.CreateUnitMixin, {
    model: function() {
        return this.store.createRecord("project");
    }
});
Blog.ProjectsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('projects');
    }
});
Blog.SearchResultsRoute = Ember.Route.extend({
    model: function (params) {
        var _this = this;
        this.controllerFor('search').set('keyword', params.keyword);
        return Ember.$.ajax({
                url: '/search/' + params.keyword,
                type: 'GET',
                contentType: 'application/json'
            }).then(function(data) {
                return Ember.RSVP.all(Ember.$.map(data.results, function (item) {
                    return Ember.Object.create(item);
                }));
            }, function (err) {
                _this.woof.danger(err.responseText);
            });
    },
    setupController: function (controller, model) {
        this._super(controller, model);
        controller.set('keyword', this.controllerFor('search').get('keyword'));


    }
});
Blog.CheckAccessComponentMixin = Ember.Mixin.create({
    isAdmin: function () {
        return this.get('parentView.controller.isAdmin');
    }.property('parentView.controller.isAdmin')//,
//    isOwner: function () { TODO: for superrights
//        return this.get('parentView.controller.isOwner');
//    }.property()
});
Blog.CheckAccessMixin = Ember.Mixin.create({
    needs: ['application'],
    isAdmin: function () {
        return this.get('controllers.application.isAdmin');
    }.property('controllers.application.isAdmin')//,
//    isOwner: function () { TODO: for superrights
//        return this.get('ownerRights');
//    }.property()
});
Blog.CreateUnitMixin = Ember.Mixin.create({
	actions: {
		createUnit: function() {
			var _this = this,  model = this.get("controller.model"),
			type = model.get('constructor.typeKey');
			model.save().then(function() {
				_this.transitionTo("/" + type + "s");
			}, function(reason) {
				console.log("Failed to create " + type + ". Reason: " + reason);
				model.rollback();
			});
		},
		uploadFile: function(params, type) {
			this.set('controller.' + type, params);
		}
	}
});
Blog.DefaultAnimationMixin = Ember.Mixin.create({
    willAnimateIn : function () {
        this.$().css("opacity", 0);
    },
    animateIn : function (done) {
        this.$().fadeTo(500, 1, done);
    },
    animateOut : function (done) {
        this.$().fadeTo(500, 0, done);
    }
});
Blog.EditComponentMixin = Ember.Mixin.create({
    editMode: false,
    actions: {
        startEditing: function() {
            this.set("editMode", true);
        },
        completeEditing: function() {
            this.set("unit.postedAt", new Date());
            this.sendAction("completeEditing", this.get("unit"));
            this.set("editMode", false);
        }
    }
});
/**
 * Created by root on 8/1/14.
 */

Blog.PaginatableMixin = Ember.Mixin.create({
	paginatedContent: function() {
		var page = this.get('page');
		var perPage = this.get('perPage');
		var start = (page - 1) * perPage;
		var end = page * perPage;
		return this.get('filteredContent').slice(start, end);//arrangedContent
	}.property('filteredContent.[]', 'page', 'perPage'),//arrangedContent
	pages: function() {
		var result = parseInt(this.get('filteredContent.length')) / this.get('perPage');
		if (this.get('filteredContent.length') % this.get('perPage') > 0) ++result;//content
		return Math.floor(result);
	}.property('filteredContent.[]', 'perPage')
});
Blog.SearchMixin = Ember.Mixin.create({
    keyword: '',
    actions: {
        search: function () {
            var keyword = this.get('keyword');
            if (keyword.length > 0) this.transitionToRoute('search.results', keyword);
        }
    }
});
Blog.SortableMixin = Ember.Mixin.create({
    staticCategories: ['Front-End', 'JavaScript', 'jQuery', 'null'],
    currentCategory: function () {
        return this.get('category');
    }.property('category'),
    queryParams: ['category'],
    category: null,
    filteredContent: function () {
        var category = this.get('category');
        var posts = this.get('model');
        return category ? posts.filterBy('category', category) : posts;
    }.property('category', 'model')
});