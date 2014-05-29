Blog.CreateUnitMixin = Ember.Mixin.create({
	actions: {
		createUnit: function() {
			var _this = this, type = this.get("currentModel.type.typeKey");
			var controller = _this.get('controller'),
				defaultParams = ['title', 'description', 'category', 'cover', 'text'], params = {};
			for (var i = 0; i < defaultParams.length; i++) {
				if (controller.hasOwnProperty(defaultParams[i])) {
					params[defaultParams[i]] = controller.get(defaultParams[i]).trim();
				}
			}

			var unit = controller.store.createRecord(type, params);
			controller.setProperties({ title: "", description: "", category: "", text: "", uploadingFile: "" });
			unit.save().then(function() {
				_this.transitionTo("/" + type + "s");
			}, function(reason) {
				console.log("Failed to create " + type + ". Reason: " + reason);
				unit.rollback();
			});
		}
	}
});
Blog.PaginatableMixin = Ember.Mixin.create({
	paginatedContent: function() {
		var page = this.get('page');
		var perPage = this.get('perPage');
		var start = (page - 1) * perPage;
		var end = page * perPage;
		return this.get('arrangedContent').slice(start, end)
	}.property('arrangedContent.[]', 'page', 'perPage'),
	pages: function() {
		var result = parseInt(this.get('content.length')) / this.get('perPage');
		if (this.get('content.length') % this.get('perPage') > 0) ++result;
		return Math.floor(result);
	}.property('content.[]', 'perPage')
});