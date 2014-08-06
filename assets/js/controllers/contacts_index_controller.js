Blog.ContactsIndexController = Ember.ArrayController.extend(Blog.CheckAccessMixin, {
    actions: {
        editContact: function (contact) {
            var _this = this;
            contact.save().then(function (data) {}, function (err) {
                _this.woof.danger(err.responseText);
                contact.rollback();
            });
        }
    }
});