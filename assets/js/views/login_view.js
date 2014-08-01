Blog.LoginView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({perspective: '1000px', rotateY: '180deg'}, 1);
    },
    animateIn : function () {
        this.$().transition({perspective: '1000px', rotateY: '0deg'}, 'slow');
    }
});