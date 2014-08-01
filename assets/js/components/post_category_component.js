Blog.PostCategoryComponent = Ember.Component.extend({
    tagName: 'li',
    isActive: function () {
        return this.get('staticCategory') === this.get('currentCategory')
    }.property('currentCategory', 'staticCategory'),
    classNameBindings: ['isActive:active']
});
