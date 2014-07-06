Blog.ApplicationRoute = Ember.Route.extend({
    beforeModel: function(transition) {
        console.log(transition);
        if (!!window.error) {
            this.transitionTo("login");
        }
    },
    model: function() {
        var user = {
            name: window.user ? window.user.name : "Guest",
            avatar: window.user ? window.user.avatar : "",
            provider: window.user ? window.user.provider : ""
        };
        console.log(user);
        window.user = null;
//        if (!!window.toRoute) this.transitionTo(window.toRoute);
        return this.store.createRecord('user', user);
    }
});