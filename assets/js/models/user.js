Blog.User = DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string', { defaultValue: ""}),
    avatar: DS.attr('string'),
    isAdmin: DS.attr('boolean', { defaultValue: false} ),
    isOwner: DS.attr('boolean', { defaultValue: false} ),
	comments: DS.hasMany("comment", { async: true }),
    photo: function () {
       var avatar = this.get('avatar');
       return !avatar || avatar.length < 1
           ? 'http://www.gravatar.com/avatar/%@.jpg?s=73'.fmt(md5(this.get('email')))
           : avatar;
    }.property('email', 'avatar')
});