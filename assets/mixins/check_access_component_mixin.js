Blog.CheckAccessComponentMixin = Ember.Mixin.create({
    isAdmin: function () {
        return this.get('parentView.controller.isAdmin');
    }.property('parentView.controller.isAdmin')//,
//    isOwner: function () { TODO: for superrights
//        return this.get('parentView.controller.isOwner');
//    }.property()
});