Blog.EditTextAreaView = Ember.TextArea.extend({
	didInsertElement: function() {
		this.$().focus();
	}
});

Ember.Handlebars.helper('edit-textarea', Blog.EditTextAreaView);