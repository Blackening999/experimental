Blog.ContactThumbComponent = Ember.Component.extend(Blog.CheckAccessComponentMixin, Blog.EditComponentMixin, {
    actions: {
        uploadFile: function(file) {
            this.set('unit.photo', file);
        }
    }
});