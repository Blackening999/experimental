Blog.IdSerializerMixin = Ember.Mixin.extend({
    primaryKey: function () {
        return '_id';
    }.property()
});