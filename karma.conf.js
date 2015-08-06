module.exports = function(config) {

    config.set({

        frameworks: ['jasmine', 'browserify'],
        files: [
            'component/mocktail.js',
            'tests/*.test.js'
        ],
        preprocessors: {
            'component/*.js': ['browserify'],
            'tests/*.js': ['browserify'],
            'tests/**/*.js': ['browserify'],
            'tests/**/**/*.js': ['browserify']
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Firefox'],
        singleRun: false,
        browserify: {
            debug: true,
            transform: [["babelify", { stage: 0 }]]
        }

    });

};
