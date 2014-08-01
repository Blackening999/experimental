Blog.DefaultAnimationMixin = Ember.Mixin.create({
    willAnimateIn : function () {
        this.$().css("opacity", 0);
    },
    animateIn : function (done) {
        this.$().fadeTo(500, 1, done);
    },
    animateOut : function (done) {
        this.$().fadeTo(500, 0, done);
    }
});