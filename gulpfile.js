var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concatCSS = require('gulp-concat-css');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');


gulp.task('less-isolate', function () {
  return gulp.src(['common/css/index/*.less', 'common/css/cooperation/*.less', 'common/css/introduction/*.less', 'common/css/join/*.less', 'common/css/products/*.less'])
    .pipe(plumber())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('common/css/dist'));
});

gulp.task('less-bundle', function () {
  return gulp.src('common/css/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('common/css'));
});

gulp.task('css-bundle', ['less-isolate', 'less-bundle'], function () {
  return gulp.src('common/css/*.css')
    .pipe(concatCSS('bundle.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('common/css/dist'));
});

gulp.task('css-deploy', ['css-bundle'], function () {
  return gulp.src('common/css/dist/**/*.css')
    .pipe(gulp.dest('public/css'));
});

gulp.task('dev', function () {
  var cssWatcher = gulp.watch(['common/css/*.less', 'common/css/*/*.less'], ['css-deploy']);
  cssWatcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['css-deploy'], function () {
  
});