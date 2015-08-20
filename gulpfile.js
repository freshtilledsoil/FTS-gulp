// Include Gulp & Plugins

var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var autoprefixer  = require('gulp-autoprefixer');
var concat        = require('gulp-concat');
var jshint        = require ('gulp-jshint');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');
var stylish       = require('jshint-stylish');
var imagemin      = require('gulp-imagemin');

// declare file structure

var jsFiles       = 'javascripts/*.js';
var sassFiles     = 'stylesheets/sass/*.scss';                        
var imageFiles    = 'images/*.{png, jpg, gif}';

gulp.task('serve', function() {
    browserSync.init({
      server: {
        baseDir: './'
      }
    });
});

gulp.task('imagemin', function() {
  return gulp.src(imageFiles)
    .pipe(imagemin())
    .pipe(gulp.dest('./images'));
});

gulp.task('styles', function() {
  return gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./stylesheets/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('javascripts/dist'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('./*.html', ['html'] );
  gulp.watch(sassFiles, ['styles']);
  gulp.watch(jsFiles, ['js']);
  gulp.watch(imageFiles, ['imagemin']);
});


gulp.task('default', ['watch', 'styles', 'html', 'js', 'imagemin','serve']);
