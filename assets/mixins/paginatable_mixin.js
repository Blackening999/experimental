Blog.PaginatableMixin = Ember.Mixin.create({
	paginatedContent: function() {
		var page = this.get('page');
		var perPage = this.get('perPage');
		var start = (page - 1) * perPage;
		var end = page * perPage;
		return this.get('filteredContent').slice(start, end);//arrangedContent
	}.property('filteredContent.[]', 'page', 'perPage'),//arrangedContent
	pages: function() {
		var result = parseInt(this.get('filteredContent.length')) / this.get('perPage');
		if (this.get('filteredContent.length') % this.get('perPage') > 0) ++result;//content
		return Math.floor(result);
	}.property('filteredContent.[]', 'perPage')
});