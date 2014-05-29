Blog.Project = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	text: DS.attr('string'),
	cover: DS.attr('string', {defaultValue: "/img/500x400.gif"}),
	items: DS.attr()
});