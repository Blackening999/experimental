Blog.ContactsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('contacts');
    }
});