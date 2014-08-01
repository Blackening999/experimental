Blog.PostFullComponent = Ember.Component.extend(Blog.EditComponentMixin, Blog.CheckAccessComponentMixin, {
	actions: {
		uploadFile: function(file) {
			this.set('unit.cover', file);
		}
	}
});