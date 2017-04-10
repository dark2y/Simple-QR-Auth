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
var bower = require('gulp-bower');

var paths = {
  sass: ['./shared/scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('install',["sass"], function(done){
   bower({ cwd: './src/generator' })
   .pipe(bower({ cwd: './src/reader'  }))
   .on('end',done);
});

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
})

gulp.task('watch', ['sass'], function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('build-qr', function (done) {
  gulp.src([
      './src/reader/lib/jsqrcode/src/grid.js',
      './src/reader/lib/jsqrcode/src/version.js',
      './src/reader/lib/jsqrcode/src/formatinf.js',
      './src/reader/lib/jsqrcode/src/detector.js',
      './src/reader/lib/jsqrcode/src/errorlevel.js',
      './src/reader/lib/jsqrcode/src/bitmat.js',
      './src/reader/lib/jsqrcode/src/datablock.js',
      './src/reader/lib/jsqrcode/src/bmparser.js',
      './src/reader/lib/jsqrcode/src/datamask.js',
      './src/reader/lib/jsqrcode/src/rsdecoder.js',
      './src/reader/lib/jsqrcode/src/gf256poly.js',
      './src/reader/lib/jsqrcode/src/gf256.js',
      './src/reader/lib/jsqrcode/src/decoder.js',
      './src/reader/lib/jsqrcode/src/qrcode.js',
      './src/reader/lib/jsqrcode/src/findpat.js',
      './src/reader/lib/jsqrcode/src/alignpat.js',
      './src/reader/lib/jsqrcode/src/databr.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('jsqrcode.min.js'))
    .pipe(gulp.dest('./shared/assets/js/'))
    .pipe(uglify())
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest('./shared/assets/js/'))
    .on('end', done);
});