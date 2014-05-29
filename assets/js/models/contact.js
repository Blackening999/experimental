Blog.Contact = DS.Model.extend({
	name: DS.attr('string'),
	direction: DS.attr('string'),
	age: DS.attr(),
	skills: DS.attr(),
	photo: DS.attr('string', {defaultValue: "/img/500x400.gif"}),
	portfolio: DS.attr()
});
