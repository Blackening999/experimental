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