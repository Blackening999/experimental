Blog.User = DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	avatar: DS.attr('string'),
	comments: []
});