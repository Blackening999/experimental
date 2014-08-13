require('ember');
require('ember_data');
require('custom_prefs');
require('moment');
require('md5');

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
Blog.ApplicationSerializer = DS.ActiveModelSerializer.extend({});
Blog.PostSerializer = DS.ActiveModelSerializer.extend(Blog.IdSerializerMixin, Blog.HasManySerializerMixin, {});
Blog.ProjectSerializer = DS.ActiveModelSerializer.extend(Blog.IdSerializerMixin, {});
Blog.ContactSerializer = DS.ActiveModelSerializer.extend(Blog.IdSerializerMixin, {});
Blog.UserSerializer = DS.ActiveModelSerializer.extend(Blog.IdSerializerMixin, {});
Blog.CommentSerializer = DS.ActiveModelSerializer.extend(Blog.IdSerializerMixin, DS.EmbeddedRecordsMixin, {});
Blog.Store = DS.Store.extend({
    revision: 12,
    adapter: DS.ActiveModelAdapter
});