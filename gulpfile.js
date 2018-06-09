var gulp = require('gulp');
// html代码压缩
var htmlClean = require('gulp-htmlclean');
// 图片压缩
var imagemin = require('gulp-imagemin');
// JS压缩
var uglify = require('gulp-uglify');
// 去掉JS中的调试语句
var strip = require('gulp-strip-debug');
// JS文件拼接
var concat = require('gulp-concat');
// less==>css
var less = require('gulp-less');
// CSS通过几个插件来对CSS进行管道化
var postcss = require('gulp-postcss');
// 自动为css添加浏览器前缀
var autoprefixer = require('autoprefixer');
// 压缩CSS代码
var cssnano = require('cssnano');
// 开启服务器
var connect = require('gulp-connect');



// gulp  配置
var folder = {
    src: 'src/',//开发目录文件夹
    dist: 'dist/'//压缩打包后的目录文件夹
}

// 开发设置
// 配置环境 export NODE_ENV = development
var devMode = process.env.NODE_ENV == 'production';


// html任务
gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())//设置2自动刷新
    if (!devMode) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + 'html/'))
})

// 图片压缩
gulp.task('img', function () {
    gulp.src(folder.src + 'images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + 'images/'))
})

// JS任务
gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*')
    .pipe(connect.reload())//设置2自动刷新
    if (!devMode) {
        page.pipe(strip())
        // .pipe(concat('main.js'))
        page.pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + 'js/'))
})

// CSS任务
gulp.task('css', function () {
    var options = [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + 'css/*')
    .pipe(connect.reload())//设置2自动刷新
        .pipe(less())
    if (!devMode) {
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.dist + 'css/'))
})
// 监听任务
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'images/*', ['img']);
})

// 服务器任务
gulp.task('server', function () {
    connect.server({
        port: 8088,
        livereload: true//设置1自动刷新
    })
})
//执行任务的队列 
gulp.task('default', ['html', 'img', 'js', 'css', 'watch', 'server'])

