Blog.InstagramWidgetView = Ember.View.extend(Blog.DefaultAnimationMixin, {
    tagName: 'ul',
    classNames: ['instagram-widget'],
    didInsertElement: function () {
        Ember.$.fn.spectragram.accessData = {
            accessToken: '227040449.c76926c.5051df00433345f88cf49553b1f43ac5',
            clientID: 'c76926ccc60c478aaafe1a785042ef4e'
        };
        this.$().spectragram('getUserFeed', {
            query: 'infi_',
            max: 4
        });

    }
});