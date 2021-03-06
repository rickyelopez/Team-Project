var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', gulp.series(function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/static/css'))
        .pipe(browserSync.stream());
}));

gulp.task('js', gulp.series(function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/moment/min/moment-with-locales.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest("src/static/js"))
    .pipe(browserSync.stream());
}));

gulp.task('serve', gulp.series(['sass'], (function() {
    
    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
})));

gulp.task('default', gulp.series('js', 'serve'));