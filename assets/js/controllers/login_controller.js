Blog.LoginController = Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin, {
    userName: "",
    userEmail: "",
    userPassword: "",
	actions: {
        authorize: function() {
            var $this = this;
            $.ajax({
                url: '/users/session',
                type: 'POST',
                data: JSON.stringify({
                    name: $this.get('userName'),
                    email: $this.get('userEmail'),
                    password: $this.get('userPassword')
                }),
                contentType: 'application/json'
            }).then(function(res) {
                var model = $this.get("model");
                model.setProperties({
                    name: res.name,
                    email: res.email
                });
                $this.transitionToRoute("application");
            }, function (xhr, status, error) {
                console.log(error);
            });
        },
		sessionAuthenticationFailed: function(error) {
			this.controller.set('errorMessage', error);
		}
	}
});