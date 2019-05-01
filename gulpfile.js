'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

// Here we indicate where to put the finished files after the assembly.
var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    // Ways to get the sources.
    src: { 
        html: 'src/*.html', 
        js: 'src/js/main.js',
        style: 'src/style/main.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    // Here we indicate which files we want to monitor.
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "galanter"
};

// HTML file build.
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Select files by the desired path
        .pipe(rigger()) //Run through rigger
        .pipe(gulp.dest(path.build.html)) //Spit them in the build folder
        .pipe(reload({stream: true})); //And we will reboot our server for updates
});

// JS file build.
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Let's find our main.js file
        .pipe(rigger()) //Run through rigger
        .pipe(sourcemaps.init()) //Initialize sourcemap
        .pipe(uglify()) //We compress our JS
        .pipe(sourcemaps.write()) //Let's list the cards
        .pipe(gulp.dest(path.build.js)) //Spit the finished file in build
        .pipe(reload({stream: true})); //And we will reboot our server for updates
});

// CSS file build.
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Let's find our main.js file
        .pipe(sourcemaps.init()) //Initialize sourcemap
        .pipe(sass()) //We will compile
        .pipe(prefixer()) //Let's add vendor prefixes
        .pipe(cssmin()) //Compress
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //Spit the finished file in build
        .pipe(reload({stream: true})); //And we will reboot our server for updates
});

// Image file build.
gulp.task('image:build', function () {
    gulp.src(path.src.img) //Choose our pictures
        .pipe(imagemin({ //Squeeze them
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //Spit the finished file in build
        .pipe(reload({stream: true})); //And we will reboot our server for updates
});

// Fonts file build.
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Gulp call build.
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

// Gulp call watch.
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

// Gulp call webserver.
gulp.task('webserver', function () {
    browserSync(config);
});

// Gulp call clean.
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// Gulp call default.
gulp.task('default', ['build', 'webserver', 'watch']);