var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concatCSS = require('gulp-concat-css');
var watch = require('gulp-watch');


gulp.task('less', function () {
  return gulp.src('common/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('common/css'));
});

gulp.task('css-bundle', ['less'], function () {
  return gulp.src(['bootstrap/dist/css/bootstrap.css', 'common/css/common.css', 'common/css/base.css'])
    .pipe(concatCSS('bundle.css'))
    .pipe(gulp.dest('common/css'));
});

gulp.task('css-isolate', ['css-bundle'],function () {
  return gulp.src(['common/css/index.css', 'common/css/events.css', 'common/css/introduction.css', 'common/css/cooperative-patterns.css'])
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

gulp.task('css-minify', ['css-isolate'], function () {
  return gulp.src(['common/css/*.css'])
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', function () {
  var cssWatcher = gulp.watch(['common/css/*.less', 'bootstrap/dist/css/bootstrap.css'], ['less', 'css-bundle', 'css-isolate', 'css-minify']);
  cssWatcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});