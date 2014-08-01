var gulp         = require('gulp');
var browserify   = require('gulp-browserify');
var myth         = require('gulp-myth');
var hint         = require('gulp-jshint');
var concat       = require('gulp-concat');
var cache        = require('gulp-cache');
var gif          = require('gulp-if');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var declare      = require('gulp-declare');
var streamqueue  = require('streamqueue');
var hbs          = require('gulp-ember-handlebars');

var paths = {
	scripts: ['assets/js/**/*.js', 'assets/mixins/*.js'],
	styles: ['assets/styles/**/*.css'],
	images: ['assets/images/**/*'],
	hbs: ['assets/templates/**/*.hbs'],
	tests: ['assets/tests/*.**'],
	mixins: ['assets/mixins/*.js'],
    templatesRoot: 'assets/templates/'
};

var debug = process.env.NODE_ENV !== 'production';

gulp.task('concat', function() {
	return gulp.src(paths.scripts)
		.pipe(concat('all.js'))
		.pipe(gulp.dest('assets/prebuild'));
});

gulp.task('hint', function () {
	return gulp.src(paths.scripts)
		.pipe(hint());
});

gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('builds/img'));
});

gulp.task('qunit-css', function() {
	return gulp.src('bower_components/qunit/qunit/qunit.css')
		.pipe(gulp.dest('builds/tests/vendor'));
});

gulp.task('qunit-js', function() {
	return gulp.src('bower_components/qunit/qunit/qunit.js')
		.pipe(gulp.dest('builds/tests/vendor'));
});

gulp.task('tests', function() {
	return gulp.src(paths.tests)
		.pipe(gulp.dest('builds/tests'));
});

gulp.task('styles', function () {
	return gulp.src('assets/styles/styles.css')
//		.pipe(concat('styles.css'))
		.pipe(myth())
		.pipe(gulp.dest('builds/css'));
});

gulp.task('custom_prefs', function() {
	return gulp.src('assets/helpers/**/*.js')
		.pipe(concat('custom.js'))
		.pipe(gulp.dest('assets/prebuild'))
});

gulp.task('mixins', function() {
	return gulp.src(paths.mixins)
		.pipe(concat('mixins.js'))
		.pipe(gulp.dest('assets/prebuild'))
});
//TODO: prepare production versions before release :)
gulp.task('scripts', ['hint', 'mixins', 'concat'], function () { //'templates'
	var ember, ember_data;
	if (debug) {
		ember = 'ember.js';
		ember_data = 'ember-data.js';
	} else {
		ember = 'ember.prod.js';
		ember_data = 'ember-data.prod.js';
	}
	return gulp.src('assets/prebuild/all.js')
		.pipe(browserify({
			debug: debug,
			shim: {
				jquery: {
					path: 'bower_components/jquery/dist/jquery.js',
					exports: '$'
				},
				handlebars: {
					path: 'bower_components/handlebars/handlebars.js',
					exports: 'Handlebars'
				},
				mixins: {
					path: 'assets/prebuild/mixins.js',
					exports: 'mixins',
					depends: {
						ember: 'ember'
					}
				},
				templates: {
					path: 'builds/templates.js',
					exports: 'Ember.TEMPLATES'
				},
				ember: {
					path: 'bower_components/ember/' + ember,
					exports: 'ember',
					depends: {
						handlebars: 'Handlebars',
						jquery: '$'
					}
				},
				ember_data: {
					path: 'bower_components/ember-data/' + ember_data,
					exports: 'DS',
					depends: {
						ember: 'ember',
						handlebars: 'Handlebars'
					}
				},
				custom_prefs: {
					path: 'assets/prebuild/custom.js',
					exports: 'custom_prefs',
					depends: {
						jquery: '$'
					}
				}
			}
		}))
		.on('prebundle', function (bundle) {
			bundle.add('../../bower_components/ember/' + ember);
			bundle.add('../../bower_components/ember-data/' + ember_data);
            bundle.add('../../builds/templates.js');
			bundle.add('../../bower_components/moment/moment.js');
            bundle.add('../../bower_components/ember-animate/ember-animate.js');
            bundle.add('../../bower_components/jquery.transit/jquery.transit.js');
            bundle.add('../../bower_components/summernote/dist/summernote.js');
		})
		.pipe(gif(!debug, uglify()))
		.pipe(gulp.dest('builds/js'));
});

gulp.task("app", ['scripts'], function () {
    var stream = streamqueue({ objectMode: true });
    stream.queue(gulp.src('builds/js/all.js'));
    stream.queue(
        gulp
            .src('assets/templates/**/*.hbs')
            .pipe(hbs({
                outputType: "browser",
                processName: function (templateName) {
                    return templateName.replace(/_/ig, "-").replace(/(\/-)/i, "/_")
                }
            }))
            .pipe(concat("builds/templates.js"))
    );
    return stream.done()
        .pipe(concat("app.js"))
        .pipe(gulp.dest("builds/js"))
});

gulp.task('default', ['styles', 'custom_prefs', 'qunit-css', 'qunit-js', 'tests', 'app'], function () { });

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['app']);
	gulp.watch(paths.tests, ['tests']);
	gulp.watch(paths.hbs, ['app']);
	gulp.watch(paths.styles, ['styles']);
});