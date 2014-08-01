Blog.EditComponentMixin = Ember.Mixin.create({
    editMode: false,
    actions: {
        startEditing: function() {
            this.set("editMode", true);
        },
        completeEditing: function() {
            this.set("unit.postedAt", new Date());
            this.sendAction("completeEditing", this.get("unit"));
            this.set("editMode", false);
        }
    }
});