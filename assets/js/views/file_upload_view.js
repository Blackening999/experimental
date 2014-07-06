Blog.FileUploadView = Ember.TextField.extend({
	upload: 'uploadFile',
	type: 'file',
	attributeBindings: ['name', 'data-type'],
	"data-type": "cover",
	change: function (evt) {
		var self = this;
		var input = evt.target;
		if (input.files && input.files[0]) {
			var reader = new FileReader(),
				file = input.files[0],
				fileSize = file.size;
			if (fileSize < 5242880) {
				reader.onload = function () {
					self.sendAction("upload", reader.result, self.$().attr("data-type"));
				};
				reader.readAsDataURL(file);
			} else {
				input.value = "";
				alert("File is too big! 5MB max!")
			}
		}
	}
});