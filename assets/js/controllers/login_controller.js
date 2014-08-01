Blog.LoginController = Ember.Controller.extend({
    userEmail: "",
    userPassword: "",
    loginFailed: false,
    isProcessing: false,
    isSlowConnection: false,
    timeout: null,
	actions: {
        authorize: function() {
            var _this = this, validationResults = _this.validate();
            if (!validationResults.status) {
                _this.woof.danger(validationResults.message);
                return;
            }
            _this.set('isProcessing', true);
            _this.set('timeout', setTimeout(function () {
                _this.woof.warning("The request seems to be taking more time than usual, please wait.");
            }, 5000));
            Ember.$.ajax({
                url: '/users/session',
                type: 'POST',
                data: JSON.stringify({
                    email: this.get("userEmail"),
                    password: this.get("userPassword")
                }),
                contentType: 'application/json'
            }).then(function(res) {
                Ember.run(function () {
                    _this.reset();
                    if (res.error) {
                        _this.woof.danger(res.error);
                        return;
                    }
                    var model = _this.get("model");
//                model.set("content", $this.store.find('user', user.id))
                    model.setProperties({
                        id: res._id,
                        name: res.name,
                        email: res.email,
                        //comments: res.comment_ids, TODO: for future availability, there should be used something like extractSingle :)
                        isAdmin: res.is_admin,
                        isOwner: res.is_owner
                    });//this.store.find('user', user.id);
                    _this.woof.success("Wellcome, your majesty " + res.name);


                    var toTransition = _this.get('toTransition');
                    if (toTransition) {
                        _this.set('toTransition', null);
                        _this.transitionToRoute(toTransition.route, toTransition.id);
                    } else {
                        _this.transitionToRoute('application');
                    }
                });

            }, function (xhr, status, error) {
                Ember.run(function () {
                    _this.reset();
                    _this.woof.danger(error);
                });
            });
        }
	},
    reset: function() {
        clearTimeout(this.get("timeout"));
        this.set('isProcessing', false);
    },
    validate: function() {
        if (this.get("userEmail") === "" || this.get("userPassword") === "") {
            return { status: false, message: "Fill all fields first" };
        }
        return { status: true };

    }
});