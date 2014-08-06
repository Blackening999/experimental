Blog.MainLogoView = Ember.View.extend({
    willAnimateIn : function () {
        this.$().transition({perspective: '600px', rotateX: '360deg'}, 1);
    },
    animateIn : function () {
        this.$().transition({perspective: '600px', rotateX: '0deg'}, 1400);
    },
    tagName: 'img',
    attributeBindings: ['src'],
    src: '../img/main-logo.png'
});