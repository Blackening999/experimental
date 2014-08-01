Blog.SearchMixin = Ember.Mixin.create({
    keyword: '',
    actions: {
        search: function () {
            var keyword = this.get('keyword');
            if (keyword.length > 0) this.transitionToRoute('search.results', keyword);
        }
    }
});