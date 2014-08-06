Blog.CheckAccessComponentMixin = Ember.Mixin.create({
    isAdmin: function () {
        return this.get('parentController.isAdmin');
    }.property('parentController.isAdmin')//,
//    isOwner: function () { TODO: for superrights
//        return this.get('parentView.controller.isOwner');
//    }.property()
});