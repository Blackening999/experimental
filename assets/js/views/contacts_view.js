Blog.ContactsView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({y: 1000}, 1);
    },
    animateIn : function () {
        this.$().transition({y: 0}, 800, 'ease');
    }
});