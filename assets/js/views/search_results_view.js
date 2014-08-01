Blog.SearchResultsView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({x: -2000}, 1);
    },
    animateIn : function () {
        this.$().transition({x: 0}, 800, 'ease');
    }
});
