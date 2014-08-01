Blog.PostThumbComponent = Ember.Component.extend(Blog.CheckAccessComponentMixin, {
	actions: {
        removePost: function() {
                this.sendAction("removePost", this.get("post"));
            }
        }
});
