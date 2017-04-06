var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");

var paths = {
  sass: ['./shared/scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
  gulp.src('./shared/scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./shared/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./shared/assets/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('build-webcam', function(done){
  gulp.src([
      './shared/lib/webcam.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('webcam.min.js'))
    .pipe(gulp.dest('./shared/assets/js/'))
    .pipe(uglify())
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest('./shared/assets/js/'))
    .on('end', done);
});

gulp.task('build-qr', function (done) {
  gulp.src([
      './client/lib/jsqrcode/src/grid.js',
      './client/lib/jsqrcode/src/version.js',
      './client/lib/jsqrcode/src/formatinf.js',
      './client/lib/jsqrcode/src/detector.js',
      './client/lib/jsqrcode/src/errorlevel.js',
      './client/lib/jsqrcode/src/bitmat.js',
      './client/lib/jsqrcode/src/datablock.js',
      './client/lib/jsqrcode/src/bmparser.js',
      './client/lib/jsqrcode/src/datamask.js',
      './client/lib/jsqrcode/src/rsdecoder.js',
      './client/lib/jsqrcode/src/gf256poly.js',
      './client/lib/jsqrcode/src/gf256.js',
      './client/lib/jsqrcode/src/decoder.js',
      './client/lib/jsqrcode/src/qrcode.js',
      './client/lib/jsqrcode/src/findpat.js',
      './client/lib/jsqrcode/src/alignpat.js',
      './client/lib/jsqrcode/src/databr.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('jsqrcode.min.js'))
    .pipe(gulp.dest('./shared/assets/js/'))
    .pipe(uglify())
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest('./shared/assets/js/'))
    .on('end', done);
});