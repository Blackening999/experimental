Blog.User = DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string', { defaultValue: ""}),
	avatar: DS.attr('string'),
    isAdmin: DS.attr('boolean', { defaultValue: false} ),
    isOwner: DS.attr('boolean', { defaultValue: false} ),
	comments: DS.hasMany("comment", { async: true })
});