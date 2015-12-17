var gulp = require('gulp'),
    pkg = require('./package.json');

var browserify = require('browserify'),
    connect = require('gulp-connect'),
    compress = require('gulp-yuicompressor'),
    karma = require('karma').Server,
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    mocha = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    rename = require('gulp-rename'),
    squash = require('gulp-remove-empty-lines'),
    strip = require('gulp-strip-comments'),
    through2 = require('through2');

    // aws = require('gulp-awspublish'),
    // moment = require('moment'),

gulp.task('default', ['build', 'connect', 'watch']);

gulp.task('connect', ['build'], function () {
  return connect.server({
      root: [ __dirname, 'test', 'test/unit', 'test/demo' ],
      port: 9002
    });
});

gulp.task('build', [
  'build:script', 'build:minify-script',
  'build:styles', 'build:minify-styles'
]);

gulp.task('watch', ['build'], function() {
  gulp.watch([
      'lib/**/*.js',
      'gulpfile.js'
    ], ['build:script']);
  gulp.watch([
      'lib/**/*.less',
      'gulpfile.js'
    ], ['build:styles']);
});

gulp.task('build:script', function(){
  return gulp.src('./lib/index.js')
    .pipe(through2.obj(function(file, enc, next){
      browserify(file.path)
        .bundle(function(err, res){
            file.contents = res;
            next(null, file);
        });
    }))
    .pipe(strip({ line: true }))
    .pipe(squash())
    .pipe(rename(pkg.name + '.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:minify-script', ['build:script'], function(){
  return gulp.src('./dist/' + pkg.name + '.js')
    .pipe(compress({ type: 'js' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:styles', function(){
  gulp.src('./lib/styles/index.less')
    .pipe(less())
    .pipe(rename(pkg.name + '.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:minify-styles', ['build:styles'], function(){
  gulp.src('./dist/' + pkg.name + '.css')
    .pipe(minifyCss({ compatibility: 'ie9' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

// ---------------------

gulp.task('test:unit', ['test:phantom', 'test:mocha']);

gulp.task('test:browserify', function(){
  return gulp.src('./test/unit/index.js')
    .pipe(through2.obj(function(file, enc, next){
      browserify(file.path)
        .bundle(function(err, res){
            file.contents = res;
            next(null, file);
        });
    }))
    .pipe(strip({ line: true }))
    .pipe(squash())
    .pipe(rename('browserified-tests.js'))
    .pipe(gulp.dest('./test/unit/build'));
});

gulp.task('test:mocha', ['test:browserify'], function () {
  return gulp.src('./test/unit/server.js', { read: false })
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 300 * 1000
    }));
});

gulp.task('test:phantom', ['test:browserify'], function () {
  return gulp.src('./test/unit/index.html')
    .pipe(mochaPhantomJS({
      mocha: {
        reporter: 'nyan',
        timeout: 300 * 1000
      }
    }))
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});

gulp.task('test:karma', ['build', 'test:browserify'], function (done){
  new karma({
    configFile: __dirname + '/config-karma.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:sauce', ['build', 'test:browserify'], function(done){
  new karma({
    configFile: __dirname + '/config-sauce.js',
    singleRun: true
  }, done).start();
});
