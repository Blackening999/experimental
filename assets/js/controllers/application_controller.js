Blog.ApplicationController = Ember.ObjectController.extend({
	userAuthenticated: function() {
		return !(this.get('model.name') === 'Guest');
	}.property('name'),
    actions: {
        logout: function() {
            var _this = this;
            Ember.$.ajax({
                url:         '/signout',
                type:        'GET',
                contentType: 'application/json'
            }).then(function(res) {
                _this.set('model', _this.get('store').createRecord('user', {
                    name: 'Guest',
                    email: '',
                    isAdmin: false,
                    isOwner: false,
                    avatar: ''
                }));
                _this.transitionToRoute(res.toRoute);
            }, function(err) {
                _this.woof.danger(err.responseText);
            });
        }
    }
});
