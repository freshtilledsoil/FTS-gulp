// GULP & PLUGINS
var autoprefixer = require('gulp-autoprefixer'),
  browserSync   = require('browser-sync'),
  beautify      = require('gulp-jsbeautifier'),
  cleanCSS      = require('gulp-clean-css'),
  del           = require('del'),
  fileinclude   = require('gulp-file-include'),
  gulp          = require('gulp'),
  imagemin      = require('gulp-imagemin'),
  notify        = require('gulp-notify'),
  plumber       = require('gulp-plumber'),
  rename        = require('gulp-rename'),
  sass          = require('gulp-sass'),
  stylelint     = require('gulp-stylelint'),
  svgmin        = require('gulp-svgmin'),
  path          = require('path'),
  webpackStream = require('webpack-stream'),
  webpack       = require('webpack');


// FILE STRUCTURE
var htmlFiles   = 'src/**/*.html',
  jsFiles       = 'src/assets/js/**/*.js',
  sassFiles     = 'src/assets/css/**/*.scss',
  imageFiles    = 'src/assets/images/**',
  svgFiles      = 'src/assets/icons/*.svg',
  fontFiles     = 'src/assets/fonts/**';


var onError = function(err) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'What did you do, Ray?',
    message: 'Error: <%= error.message%>',
    sound: 'beep'
  })(err);
};


gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: false
  });
});


gulp.task('svgmin', function() {
  return gulp.src(svgFiles)
    .pipe(svgmin())
    .pipe(gulp.dest('./dist/assets/icons'))
    .pipe(browserSync.stream());
});


gulp.task('fonts', function() {
  return gulp.src(fontFiles)
    .pipe(gulp.dest('./dist/assets/fonts'))
    .pipe(browserSync.stream());
});


gulp.task('imagemin', function() {
  return gulp.src(imageFiles)
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images'))
    .pipe(browserSync.stream());
});


gulp.task('styles', function() {

  return gulp.src(sassFiles)
    .pipe(stylelint({
      reporters: [
          { formatter: 'string', console: true }
      ]
    }))
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(browserSync.stream());
});


gulp.task('es6', function () {
  return gulp.src('./src/assets/js/app.js')
  .pipe(plumber({errorHandler: onError}))
  .pipe(webpackStream({
    entry: {
    'app': './src/assets/js/app.js',
    'app.min': './src/assets/js/app.js',
    },
    // devtool: 'source-map',
    output: { filename: '[name].js' },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader?presets[]=es2015',
          include: [ path.resolve(__dirname, 'src') ],
          exclude: /node-modules/
        },
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
      }),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',

      }),
    ]
  }))
  .pipe(gulp.dest('./dist/assets/js/'))
  .pipe(browserSync.stream());
});

// https://github.com/coderhaoxin/gulp-file-include
gulp.task('fileinclude', function() {
  gulp.src([htmlFiles, '!src/g-include/**'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(beautify())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});


gulp.task('watch', function() {
  gulp.watch(htmlFiles,  ['fileinclude']);
  gulp.watch(sassFiles,  ['styles']);
  gulp.watch(fontFiles,  ['fonts']);
  gulp.watch(jsFiles,    ['es6', 'eslint']);
  gulp.watch(imageFiles, ['imagemin']);
  gulp.watch(svgFiles,   ['svgmin']);
});


gulp.task('clean', function() {
  return del.sync('dist');
});


gulp.task('build', [
  'fileinclude',
  'fonts',
  'styles',
  'es6',
  'imagemin',
  'svgmin'
]);


gulp.task('default', [
  'clean',
  'watch',
  'serve',
  'build'
]);
