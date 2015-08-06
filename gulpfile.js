(function main() {

    var gulp   = require('gulp'),
        karma  = require('gulp-karma'),
        path   = require('path'),
        yaml   = require('js-yaml'),
        fs     = require('fs'),
        config = yaml.safeLoad(fs.readFileSync('./mocktail.yml', 'utf8'));

    gulp.task('karma', function() {

        return gulp.src([].concat(config.component, config.tests))
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            }))
            .on('error', function(err) { throw err; });

    });

    gulp.task('test', ['karma']);
    gulp.task('default', ['test']);

})();
