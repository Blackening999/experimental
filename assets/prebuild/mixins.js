Blog.CheckAccessComponentMixin = Ember.Mixin.create({
    isAdmin: function () {
        return this.get('parentController.isAdmin');
    }.property('parentController.isAdmin')//,
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
            this.sendAction("completeEditing", this.get("unit"));
            this.set("editMode", false);
        }
    }
});
//Blog.ExtractSingleMixin = Ember.Mixin.extend({
//    extractSingle: function (store, type, payload, id) {
//        var items = payload.post.items,
//            commentIds = items.mapBy('id');
//
//        payload.items = items;
//        payload.post.items = commentIds;
//
//        return this._super.apply(this, arguments);
//    }
//});
Blog.HasManySerializerMixin = Ember.Mixin.create({
    serializeHasMany: function(record, json, relationship) {
        var key = relationship.key;
        var json_key = key.singularize().decamelize() + '_ids';

        var relationshipType = DS.RelationshipChange.determineRelationshipType(
            record.constructor, relationship);

        if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
            json[json_key] = Ember.get(record, key).mapBy('id');
        }
    }
});
Blog.IdSerializerMixin = Ember.Mixin.create({
    primaryKey: function () {
        return '_id';
    }.property()
});
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