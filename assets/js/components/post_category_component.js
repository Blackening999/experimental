Blog.PostCategoryComponent = Ember.Component.extend({
    tagName: 'li',
    hardcodedCategory: function () {
        return this.get('staticCategory') != 'null' ? this.get('staticCategory') : 'All';
    }.property('staticCategory'),
    isActive: function () {
        return this.get('staticCategory') === this.get('currentCategory')
    }.property('currentCategory', 'staticCategory'),
    classNameBindings: ['isActive:active']
});
