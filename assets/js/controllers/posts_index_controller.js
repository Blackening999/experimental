Blog.PostsIndexController = Ember.ArrayController.extend(Blog.PaginatableMixin, Blog.CheckAccessMixin, Blog.SearchMixin, {
    needs: ['posts'],
    filteredContent: function () {
        return this.get('controllers.posts.filteredContent');
    }.property('controllers.posts.filteredContent', 'model'),
	sortProperties: ['postedAt'],
	sortAscending: true,
	page: 1,
	perPage: 8,
	showPagination: Ember.computed.gt('pages', 1),
	postsChunk: Ember.computed.alias('paginatedContent.length'),
	firstColumn: function() {
		return this.chunkContent("first");
	}.property('postsChunk', 'page'),
	secondColumn: function() {
		return this.chunkContent("second");
	}.property('postsChunk', 'page'),
	chunkContent: function(type) {
		var chunk = this.get('postsChunk'), content = this.get('paginatedContent'), start = 0, end = Math.floor(chunk / 2);
		if (chunk % 2 == 0) {
			return type == "first" ? content.slice(start, end) : content.slice(end, chunk);
		}
		return type == "first" ? content.slice(start, end + 1) : content.slice(end + 1, chunk);
	},
	actions: {
		removePost: function(post) {
            var _this = this;
            if (confirm('Are you sure?')) {
                post.deleteRecord();
                post.save().then(function(data) {}, function(err) {
                    _this.woof.danger(err.responseText);
                    post.rollback();
                });
            }

		}
	}
});