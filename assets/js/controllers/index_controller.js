Blog.IndexController = Ember.ArrayController.extend({
	logo: '',
	recentProjects: function() {
		return this.get('content').slice(0, 6);
	}.property('content.@each'),
    recentPosts: function () {
        return this.get('posts').slice(0,3)
    }.property('posts.@each')
});