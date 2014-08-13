Blog.Contact = DS.Model.extend({
	name: DS.attr('string'),
    email: DS.attr('string'),
    phone: DS.attr('string'),
    address: DS.attr('string'),
    skype: DS.attr('string'),
    googleplus: DS.attr('string'),
    linkedin: DS.attr('string'),
    facebook: DS.attr('string'),
    github: DS.attr('string'),
    twitter: DS.attr('string'),
    credentials: DS.attr('string'),
    portfolio: DS.attr('string'),
	photo: DS.attr('string', {defaultValue: "/img/140x140.gif"})
});
