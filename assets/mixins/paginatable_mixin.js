Blog.PaginatableMixin = Ember.Mixin.create({
	paginatedContent: function() {
		var page = this.get('page');
		var perPage = this.get('perPage');
		var start = (page - 1) * perPage;
		var end = page * perPage;
		return this.get('arrangedContent').slice(start, end)
	}.property('arrangedContent.[]', 'page', 'perPage'),
	pages: function() {
		var result = parseInt(this.get('content.length')) / this.get('perPage');
		if (this.get('content.length') % this.get('perPage') > 0) ++result;
		return Math.floor(result);
	}.property('content.[]', 'perPage')
});