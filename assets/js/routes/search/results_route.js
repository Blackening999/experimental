Blog.SearchResultsRoute = Ember.Route.extend({
    model: function (params) {
        var _this = this;
        this.controllerFor('search').set('keyword', params.keyword);
        return Ember.$.ajax({
                url: '/search/' + params.keyword,
                type: 'GET',
                contentType: 'application/json'
            }).then(function(data) {
                return Ember.RSVP.all(Ember.$.map(data.results, function (item) {
                    return Ember.Object.create(item);
                }));
            }, function (err) {
                _this.woof.danger(err.responseText);
            });
    },
    setupController: function (controller, model) {
        this._super(controller, model);
        controller.set('keyword', this.controllerFor('search').get('keyword'));


    }
});