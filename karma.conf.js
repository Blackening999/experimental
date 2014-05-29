module.exports = function(karma) {
	karma.set({
		files: [
			"bower_components/jquery/dist/jquery.min.js",
			"bower_components/handlebars/handlebars.js",
			"bower_components/ember/ember.js",
			"bower_components/ember-data/ember-data.js",
			"bower_components/qunit/qunit/qunit.js",
			"bower_components/jquery-mockjax/jquery.mockjax.js",
			"builds/js/all.js",
			"assets/tests/*.js"
		],

		logLevel: karma.LOG_ERROR,
		browsers: ['PhantomJS'],
		singleRun: true,
		autoWatch: false,

		frameworks: ["qunit"]
	});
};