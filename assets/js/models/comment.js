Blog.Comment = DS.Model.extend({
    text: DS.attr("string"),
    user: DS.belongsTo("user", { async: true }),
    post: DS.belongsTo("post", { async: true }),
    postedAt: DS.attr("date", { defaultValue: new Date() })
});
