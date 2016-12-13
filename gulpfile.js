// GULP & PLUGINS
var autoprefixer  = require('gulp-autoprefixer');
var babelify      = require('babelify');
var browserify    = require('browserify');
var browserSync   = require('browser-sync');
var buffer        = require('vinyl-buffer');
var cleanCSS      = require('gulp-clean-css');
var concat        = require('gulp-concat');
// var connectPHP    = require('gulp-connect-php');
var del           = require('del');
var fileinclude   = require('gulp-file-include');
var gulp          = require('gulp');
var imagemin      = require('gulp-imagemin');
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var source        = require('vinyl-source-stream');
var sourcemaps    = require('gulp-sourcemaps');
var svgmin        = require('gulp-svgmin');
var uglify        = require('gulp-uglify');


// FILE STRUCTURE
var htmlFiles     = 'src/**/*.html';
var jsFiles       = 'src/assets/js/**/*.js';
var sassFiles     = 'src/assets/css/**/*.scss';
var imageFiles    = 'src/assets/images/**';
var svgFiles      = 'src/assets/icons/*.svg';
var fontFiles     = 'src/assets/fonts/**';


var onError = function ( err ) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'What did you do, Ray?',
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
    .pipe(gulp.dest('./dist/assets/icons'))
    .pipe(browserSync.stream());
});


gulp.task('fonts', function () {
  return gulp.src(fontFiles)
    .pipe(gulp.dest('./dist/assets/fonts'))
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
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(browserSync.stream());
});


gulp.task('concat', function () {
  return gulp.src('./src/assets/js/vendor/**')
    .pipe(concat('vendor.concat.js'))
    .pipe(gulp.dest('./src/assets/js/'))
});


gulp.task('uglify', function () {
  return gulp.src('./src/assets/js/*.js')
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});


// gulp.task('es6', function () {
//   return browserify('./src/assets/js/app.js')
//     .transform(babelify.configure({ presets: ['es2015'] }))
//     .bundle()
//     .on('error', function ( error ) {
//       onError(error);
//       this.emit('end');
//     })
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({ loadMaps: true }))
//     .pipe(uglify())
//     .pipe(sourcemaps.write('./'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('./dist/assets/js'))
//     .pipe(browserSync.stream());
// });


// https://github.com/coderhaoxin/gulp-file-include
gulp.task('fileinclude', function() {
  gulp.src([htmlFiles, '!src/g-include/**'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});


gulp.task('watch', function () {
  gulp.watch(htmlFiles,  ['fileinclude']);
  gulp.watch(sassFiles,  ['styles']);
  gulp.watch(fontFiles,  ['fonts']);
  gulp.watch(jsFiles,    ['concat', 'uglify']);
  gulp.watch(imageFiles, ['imagemin']);
  gulp.watch(svgFiles,   ['svgmin']);
});


gulp.task('clean', function() {
  return del('dist');
});


gulp.task('build', [
  'fileinclude',
  'fonts',
  'styles',
  'concat',
  'imagemin',
  'svgmin'
]);


gulp.task('default', [
  'watch',
  'serve',
  'build'
]);
