Blog.SortableMixin = Ember.Mixin.create({
    staticCategories: ['Front-End', 'JavaScript', 'jQuery', 'null'],
    currentCategory: function () {
        return this.get('category');
    }.property('category'),
    queryParams: ['category'],
    category: null,
    filteredContent: function () {
        var category = this.get('category');
        var posts = this.get('model');
        return category ? posts.filterBy('category', category) : posts;
    }.property('category', 'model')
});