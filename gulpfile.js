(function main() {

    var path   = require('path'),
        fs     = require('fs'),
        gulp   = require('gulp'),
        karma  = require('gulp-karma'),
        yaml   = require('js-yaml'),
        config = yaml.safeLoad(fs.readFileSync('./mocktail.yml', 'utf8'));

    gulp.task('karma', function() {

        return gulp.src([].concat(config.component, config.tests))
                   .pipe(karma({
                       configFile: 'karma.conf.js',
                       action: 'run'
                   }))
                   .on('error', function(error) { throw error; });

    });

    gulp.task('test', ['karma']);
    gulp.task('default', ['test']);

})();
