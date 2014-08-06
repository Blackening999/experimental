Blog.EditComponentMixin = Ember.Mixin.create({
    editMode: false,
    actions: {
        startEditing: function() {
            this.set("editMode", true);
        },
        completeEditing: function() {
            this.sendAction("completeEditing", this.get("unit"));
            this.set("editMode", false);
        }
    }
});