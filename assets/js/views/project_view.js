Blog.ProjectView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({opacity: 0}, 1);
    },
    animateIn : function () {
        this.$().transition({opacity: 1}, 1000, 'ease');
    }
});