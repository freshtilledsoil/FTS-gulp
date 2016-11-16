// GULP & PLUGINS
var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var connectPHP    = require('gulp-connect-php');
var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var rename        = require('gulp-rename');
var cleanCSS      = require('gulp-clean-css');
var concat        = require('gulp-concat');
var babelify      = require('babelify');
var browserify    = require('browserify');
var buffer        = require('vinyl-buffer');
var source        = require('vinyl-source-stream');
var sourcemaps    = require('gulp-sourcemaps');
var uglify        = require('gulp-uglify');
var imagemin      = require('gulp-imagemin');
var svgmin        = require('gulp-svgmin');

// FILE STRUCTURE
var htmlFiles     = 'src/*.html';
var jsFiles       = 'src/assets/js/**/*.js';
var sassFiles     = 'src/assets/css/**/*.scss';
var imageFiles    = 'src/assets/images/*.{png, jpg, gif}';
var svgFiles      = 'src/assets/icons/*.svg';


var onError = function ( err ) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'What did you do, Ray? aka: Failure...',
    message: 'Error: <%= error.message%>',
    sound: 'beep'
  })( err );
};


gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});


gulp.task('html', function () {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});


gulp.task('svgmin', function () {
  return gulp.src(svgFiles)
    .pipe(svgmin())
    .pipe(gulp.dest('./dist/assets/images'))
    .pipe(browserSync.stream());
});


gulp.task('imagemin', function () {
  return gulp.src(imageFiles)
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images'))
    .pipe(browserSync.stream());
});


gulp.task('styles', function () {
  return gulp.src(sassFiles)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(browserSync.stream());
});


gulp.task('es6', function () {
  return browserify('./src/assets/js/app.js')
    .transform(babelify.configure({ presets: ['es2015'] }))
    .bundle()
    .on('error', function ( error ) {
      onError(error);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});


gulp.task('watch', function () {
  gulp.watch(htmlFiles,  ['html']);
  gulp.watch(sassFiles,  ['styles']);
  gulp.watch(jsFiles,    ['es6']);
  gulp.watch(imageFiles, ['imagemin']);
  gulp.watch(svgFiles,   ['svgmin']);
});


gulp.task('build', ['html', 'styles', 'es6', 'imagemin', 'svgmin']);
gulp.task('default', ['watch', 'serve', 'build']);
