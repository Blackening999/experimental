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