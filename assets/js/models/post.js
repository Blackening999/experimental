Blog.Post = DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    cover: DS.attr('string', {defaultValue: "/img/500x400.gif"}),
    text: DS.attr('string'),
    category: DS.attr('string'),
    items: DS.attr(),
    postedAt: DS.attr('string', { defaultValue: new Date() }),
    comments: DS.hasMany("comment", { async: true })
});