Blog.CreateUnitMixin = Ember.Mixin.create({
	actions: {
		createUnit: function() {
			var _this = this,  model = this.get("controller.model"),
			type = model.get('constructor.typeKey');
			model.save().then(function() {
				_this.transitionTo("/" + type + "s");
			}, function(reason) {
				console.log("Failed to create " + type + ". Reason: " + reason);
				model.rollback();
			});
		},
		uploadFile: function(params, type) {
			this.set('controller.' + type, params);
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