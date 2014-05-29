Blog.EditTextView = Ember.TextField.extend({
	didInsertElement: function() {
		this.$().focus();
	}
});

Ember.Handlebars.helper('edit-text', Blog.EditTextView);