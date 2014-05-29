Blog.IndexController = Ember.ArrayController.extend({
	logo: '',
	javascriptCreativityCover: '',
	frontendNewsCover: '',
	designHintsCover: '',
	recentProjects: function() {
		return this.get('content').slice(0, 6);
	}.property('content.[]')
});