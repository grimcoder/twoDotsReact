var gulp = require("gulp");
var ts = require("gulp-typescript");
var babel = require("gulp-babel");
var rename = require("gulp-rename");


var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var reactify = require('reactify');
var htmlMinifier = require('gulp-html-minifier');
var uglify = require('gulp-uglify');



gulp.task('js-development', function () {
    return browserify('./source/js/app.jsx')
        .transform(reactify)
        .bundle()
        .pipe(vinylSourceStream('produce-market.js'))
        .pipe(gulp.dest('./build/app/'));
});


gulp.task('html-development', function () {

     gulp
        .src('./src/*.css')
        .pipe(gulp.dest('./build'));

    return gulp
        .src('./src/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('ts-development', function () {

    var tsProject = ts.createProject(__dirname + "/tsconfig.json");

     gulp.src("src/**/*.ts")
        .pipe(ts(tsProject))
        //.pipe(babel({
        //}))
        .pipe(rename(function (path) {
            path.extname = ".js";
        }))
        .pipe(gulp.dest(__dirname + "/tmp"))

    return gulp.src("src/**/*.tsx")
        .pipe(ts(tsProject))
        //.pipe(babel({
        //}))
        .pipe(rename(function (path) {
            path.extname = ".js";
        }))
        .pipe(gulp.dest(__dirname + "/tmp"))
});


gulp.task('js-development', ['ts-development'], function () {
    return browserify(__dirname + "/tmp/ts/app.js")
        .transform(reactify)
        .bundle()
        .pipe(vinylSourceStream('app.js'))
        .pipe(gulp.dest('./build/app/'));
});


gulp.task('watch', function () {
    gulp.watch('./src/ts/**/*.ts', ['ts-development','js-development']);
    gulp.watch('./src/ts/**/*.tsx', ['ts-development','js-development']);
    gulp.watch('./src/**/*.html', ['html-development']);
    gulp.watch('./src/**/*.css', ['html-development']);
});


gulp.task('default', ['ts-development','js-development', 'html-development', 'watch']);