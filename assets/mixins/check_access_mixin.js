Blog.CheckAccessMixin = Ember.Mixin.create({
    needs: ['application'],
    isAdmin: function () {
        return this.get('controllers.application.isAdmin');
    }.property('controllers.application.isAdmin')//,
//    isOwner: function () { TODO: for superrights
//        return this.get('ownerRights');
//    }.property()
});