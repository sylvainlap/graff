'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./server/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./client/lib'));
});

gulp.task('default', ['lint', 'bower']);
