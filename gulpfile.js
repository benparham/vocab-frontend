'use strict'

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var envify = require('envify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');

var paths = {
  app: {
    entry: './app/main.jsx',
    css: './assets/css/*.less',
    js: ['./app/**/*.jsx', './app/**/*.js']
  },
  server: {
    entry: './server/main.js',
    js: './server/*.js'
  }
};

var app_builder = function builder() {
  return browserify({
    entries: paths.app.entry,
    extensions: ['.jsx']
  })
    .transform(reactify)
    .transform(envify)
    .bundle()
    .pipe(source('main.jsx'))
    .pipe(rename('bundle.js'));
};

gulp.task('build-app', function() {
  return app_builder()
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function() {
  return gulp.src('./assets/css/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('build', ['build-app', 'less']);

function watch() {
  process.stdout.write("Watching...\n");

  nodemon({
    script: paths.server.entry,
    stdout: false,
    ext: 'js less html'
  });

  gulp.watch(paths.app.js, ['build-app']);
  gulp.watch(paths.app.css, ['less']);
  gulp.watch(paths.server.js);
}

gulp.task('default', ['build'], watch());
