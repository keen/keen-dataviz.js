var gulp = require('gulp'),
    pkg = require('./package.json');

var browserify = require('browserify'),
    connect = require('gulp-connect'),
    compress = require('gulp-yuicompressor'),
    del = require('del'),
    karma = require('karma').server,
    less = require('gulp-less'),
    mocha = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    rename = require('gulp-rename'),
    squash = require('gulp-remove-empty-lines'),
    strip = require('gulp-strip-comments'),
    through2 = require('through2');

    // aws = require('gulp-awspublish'),
    // moment = require('moment'),

gulp.task('default', ['test:unit']);

gulp.task('build', ['build:script', 'build:styles']);

gulp.task('build:script', function(){
  return gulp.src('./lib/index.js')
    .pipe(through2.obj(function(file, enc, next){
      browserify(file.path)
        // .transform('stripify')
        .bundle(function(err, res){
            // assumes file.contents is a Buffer
            file.contents = res;
            next(null, file);
        });
    }))
    .pipe(strip({ line: true }))
    .pipe(squash())
    .pipe(rename('keen-dataviz.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:styles', function(){
  gulp.src('./lib/styles/index.less')
    .pipe(less())
    .pipe(rename('keen-dataviz.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test:unit', ['test-with-mocha']);

// gulp.task('test:clean', function (callback) {
//   del(['./test/unit/build'], callback);
// });
//
// gulp.task('test:build', ['test:clean'], function () {
//   return gulp.src('./test/unit/index.js')
//     .pipe(transform(function(filename) {
//       var b = browserify(filename);
//       return b.bundle();
//     }))
//     .pipe(rename('browserified-tests.js'))
//     .pipe(gulp.dest('./test/unit/build'));
// });

gulp.task('test-with-mocha', function () {
  return gulp.src('./test/unit/server.js', { read: false })
  .pipe(mocha({ reporter: 'nyan' }));
});

// gulp.task('test-with-phantom', ['build', 'test:prepare'], function () {
//   return gulp.src('./test/unit/index.html')
//     .pipe(mochaPhantomJS());
// });
//
// gulp.task('test-with-karma', ['build', 'test:prepare'], function (done){
//   karma.start({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done);
// });
