Blog.ApplicationRoute = Ember.Route.extend({
    model: function() {
        var isGuest = !window.user, user = isGuest
            ? { name: "Guest" }
            : {
                id       : window.user._id ,
                name     : window.user.name,
                email    : window.user.email,
                avatar   : window.user.avatar,
                provider : window.user.provider,
                isAdmin  : window.user.is_admin,
                isOwner  : window.user.is_owner
              };
        window.user = null;
        return isGuest ? this.store.createRecord('user', user) : this.store.find('user', user.id);
    },
    activate: function() {
        if (window.message) {
            this.woof.danger(window.message);
        }
        if (!!window.error) {
            this.transitionTo("login");
        }
    },
    actions: {
        openModal: function(modalName, model) {
            this.controllerFor(modalName).set('model', model);
            this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },
        closeModal: function() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }

});