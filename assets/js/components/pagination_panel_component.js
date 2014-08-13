Blog.PaginationPanelComponent = Ember.Component.extend({
	hasPrevious: function() {
		return this.get('page') > 1
	}.property('page'),
	hasNext: function() {
		return this.get('page') < this.get('pages')
	}.property('page', 'pages'),
	lastPage: Ember.computed.alias('pages'),
	visiblePages: function() {
		var pages = this.get('pages');
		var page = this.get('page');

		function finish(start, limit) {
			return start + limit ;
		}

		var limit = pages < 5 ? pages : 5;
		var start = page - Math.floor(parseInt(limit / 2));
		if (finish(start, limit) > pages) { start = pages - limit + 1 }
		if (start < 1) start = 1;

		var results = [];
		for (var i = start; i < finish(start, limit); i++) {
			results.push(i);
		}
		return results;

	}.property('page', 'pages'),
	showBefore: function() {
		return this.get('visiblePages.firstObject') > 3;
	}.property('visiblePages.[]'),
	showAfter: function() {
		return Math.abs(this.get('lastPage') - this.get('visiblePages.lastObject') > 2)
	}.property('visiblePages.[]', 'lastPage'),
	actions: {
		goToNextPage: function() {
			if (this.get('hasNext')) return this.incrementProperty('controller.page')
		},
		goToPreviousPage: function() {
			if (this.get('hasPrevious')) return this.decrementProperty('controller.page')
		},
		goToPage: function(pageNumber) {
			if (pageNumber >= 1 && pageNumber <= this.get('lastPage')) {
				this.set('controller.page', pageNumber);
			}
		}
	}
});