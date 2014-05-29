Blog.ProjectsIndexController = Ember.ArrayController.extend({
	mixRules: ['size-3', 'size-3-half', 'size-3-half', 'size-3-half', 'size-3-half', 'size-2-half', 'size-1', 'size-1', 'size-1-half', 'size-1-half'],
	sortAscending: true,
	currentClass: function() {
		return this.get('mixRules');
	},
	mixedContent: function() {
		var content = this.get('content'), size = content.get('length');
		for (var i = 0; i < size; i++) {
			var m = i == 0 ? '' : ' m' + i, pos = i;
			if (pos > 9) pos -= 10;
			content.objectAt(i).set('currentClass', 'js-image ' + this.get('mixRules')[pos] + m);
		}
		return content.slice(0, size);
	}.property('[].content')
});
