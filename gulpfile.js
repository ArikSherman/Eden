var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var sass            = require('gulp-sass');
var jade            = require('gulp-jade');
var reload          = browserSync.reload;
var imagemin        = require('gulp-imagemin');
var cache           = require('gulp-cache');
var uglify          = require('gulp-uglify');
var prefix          = require('gulp-autoprefixer');
var cssnano         = require('gulp-cssnano');
var htmlmin         = require('gulp-htmlmin');
var runSequence     = require('run-sequence');

gulp.task('sass', function(){
    return gulp.src('app/sass/*.sass')
        .pipe(sass()) // Using gulp-sass
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('jade', function() {
    return gulp.src('app/jade/*.jade')
        .pipe(jade({
            pretty: true
        })) // pipe to jade plugin
        .pipe(gulp.dest('app')) // tell gulp our output folder
});

gulp.task('html-min', function() {
    return gulp.src('app/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(''));
});

gulp.task('uglify', function(){
    return gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('js'))
});

gulp.task('css-nano', function(){
    return gulp.src('app/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('css'))
});

gulp.task('image-optimise', function(){
    return gulp.src('app/assets/img/**/*.+(png|jpg|gif|svg|ico)')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('assets/img'))
});

gulp.task('eden-css', function() {
    return gulp.src('app/bower_components/eden/dist/css/eden.css')
        .pipe(gulp.dest('app/css'))
});

gulp.task('eden-js', function() {
    return gulp.src('app/bower_components/eden/dist/js/eden.js')
        .pipe(gulp.dest('app/js'))
});

gulp.task('fonts', function() {
    return gulp.src('app/assets/fonts/**/*')
        .pipe(gulp.dest('assets/fonts'))
});

gulp.task('docs', function() {
    return gulp.src('app/assets/docs/**/*')
        .pipe(gulp.dest('assets/docs'))
});

gulp.task('video', function() {
    return gulp.src('app/assets/video/**/*')
        .pipe(gulp.dest('assets/video'))
});

gulp.task('minify', ['html-min', 'uglify', 'css-nano', 'image-optimise']);

gulp.task('eden', ['eden-css', 'eden-js'])

gulp.task('transfer', ['fonts', 'docs', 'video'])

gulp.task('jade-watch', ['jade'], reload);

gulp.task('jquery-watch', ['uglify'], reload);

gulp.task('live', ['browserSync', 'sass', 'jade'], function (){
    gulp.watch('app/sass/*.sass', ['sass']);
    gulp.watch('./app/jade/**/*.jade', ['jade-watch']);
    gulp.watch('./app/js/**/*.js', ['jquery-watch']);
    // Other watchers
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('compile', ['minify', 'transfer']);

gulp.task('default', function () {
    runSequence(
        ['jade', 'sass'],
        'compile',
        'live'
    )
});
