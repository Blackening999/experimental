Blog.ApplicationController = Ember.ObjectController.extend({
	userAuthenticated: function() {
		return !(this.get("model.name") === "Guest");
	}.property("name"),
    actions: {
        logout: function() {
            var $this = this;
            Ember.$.ajax({
                url:         '/signout',
                type:        'GET',
                contentType: 'application/json'
            }).then(function(res) {
                $this.get("model").set("name", "Guest");
                $this.transitionToRoute(res.toRoute);
            }, function(xhr, status, error) {
                console.log(error);
            });
        }
    }
});
