Blog.PaginationPageComponent = Ember.Component.extend({
	isCurrent: function() {
		return this.get('currentPage') == this.get('page')
	}.property('currentPage', 'page'),
	tagName: 'li',
	classNameBindings: ['isCurrent:disabled', 'isCurrent:sel'],
	actions: {
		pageClicked: function() {
			return this.get('parentView').send('goToPage', this.get('page'));
		}
	}
});