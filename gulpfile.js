// GULP & PLUGINS
var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var autoprefixer  = require('gulp-autoprefixer');
var concat        = require('gulp-concat');
var jshint        = require ('gulp-jshint');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');
var stylish       = require('jshint-stylish');
var imagemin      = require('gulp-imagemin');
var svgmin        = require('gulp-svgmin');
var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');
var connectPHP    = require('gulp-connect-php');

// FILE STRUCTURE
var jsFiles       = 'app/javascripts/*.js';
var sassFiles     = 'app/stylesheets/sass/*.scss';
var imageFiles    = 'app/images/*.{png, jpg, gif}';
var phpFiles      = 'app/**/*.php';
var svgFiles      = 'app/images/*.svg'

var onError = function(err) {
    notify.onError({
      title: 'Gulp',
      subtitle: 'Failure!',
      message: 'Error: <%= error.message%>',
      sound: 'beep'
    })(err);
    this.emit('end');
}

gulp.task('connectPHP', function(){
  connectPHP.server({
    hostname: '0.0.0.0',
    port: 8000,
    base: './app/'
  });
});

gulp.task('serve', ['connectPHP'], function() {
  notify: true,
  browserSync({
    proxy: 'localhost:8000'
  });
});

gulp.task('svgmin', function() {
    return gulp.src(svgFiles)
      .pipe(svgmin())
      .pipe(gulp.dest('./app/images'))
      .pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
  return gulp.src(imageFiles)
    .pipe(imagemin())
    .pipe(gulp.dest('./app/images'))
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return gulp.src(sassFiles)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./app/stylesheets/css'))
    .pipe(browserSync.stream());
});

gulp.task('php', function() {
  return gulp.src(phpFiles)
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(plumber({errorHandler: onError}))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./app/javascripts/dist'))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./app/javascripts/dist'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch(phpFiles, ['php'] );
  gulp.watch(sassFiles, ['styles']);
  gulp.watch(jsFiles, ['js']);
  gulp.watch(imageFiles, ['imagemin']);
  gulp.watch(svgFiles, ['svgmin']);
});

gulp.task('default', ['watch', 'styles', 'php', 'js', 'imagemin','svgmin', 'serve']);
