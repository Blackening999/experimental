Blog.IdSerializerMixin = Ember.Mixin.create({
    primaryKey: function () {
        return '_id';
    }.property()
});