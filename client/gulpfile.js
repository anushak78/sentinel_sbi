(function () {
    'use strict';
    const gulp = require('gulp');
    const concat = require('gulp-concat');
    const sourcemaps = require('gulp-sourcemaps');
    const nodemon = require('gulp-nodemon');
    let task = ['js-plugins', 'js'];
    let plugins = require("gulp-load-plugins")({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
        replaceString: /\bgulp[\-.]/
    });

    let path = {
        js_plugins: [],
        // js_plugins: ["./assets/src/js/*.js", "./assets/src/js/**/*.js", "!assets/src/js/jquery.min.js", "!assets/src/js/bootstrap.js"],
        js: ['./app.js', "./packages/**/public/**/*.js"],
        css: ["./assets/src/css/*.css", "./assets/src/**/*.css"]
    };
    // this gets bower files
    // path.js_plugins = path.js_plugins.concat(plugins.mainBowerFiles());
    path.js_plugins.push('./bower_components/angular/angular.js');
    path.js_plugins.push('./bower_components/angular-ui-router/release/angular-ui-router.min.js');
    path.js_plugins.push('./bower_components/angularUtils-pagination/dirPagination.js');
    path.js_plugins.push('./bower_components/oclazyload/dist/ocLazyLoad.js');
    path.js_plugins.push('./bower_components/lodash/dist/lodash.min.js');
    path.js_plugins.push('./bower_components/moment/min/moment.min.js');
    path.js_plugins.push('./bower_components/parsleyjs/dist/parsley.js');
    path.js_plugins.push('./bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify.min.js');
    path.js_plugins.push('./assets/pdf/bower_components/pdfmake/build/pdfmake.js');
    path.js_plugins.push('./assets/pdf/bower_components/pdfmake/build/vfs_fonts.js');

    gulp.task('js-plugins', function () {
        console.log("called");
        return gulp.src(path.js_plugins)
            .pipe(sourcemaps.init())
            .pipe(concat('app.plugin.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build'))
    });

    gulp.task('js', function () {
        return gulp.src(path.js)
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build'))
    });

    if (process.env.APP !== "build") {

        gulp.task('watch', function () {
            gulp.watch(path.js_plugins, ['js-plugins']);
            gulp.watch(path.js, ['js']);
        });
        task.push('watch');


        gulp.task('nodemon', function () {
            nodemon({
                script: 'server.js',
                ignore: ['node_modules/*', 'bower_components/*', 'build/*', 'pm2/*'],
            }).on('restart', function () {
                console.log('restarted!')
            })
        });
        task.push('nodemon');
    }

    gulp.task('default', task);

    module.exports = {};
})();