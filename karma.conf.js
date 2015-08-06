module.exports = function(config) {

    config.set({

        frameworks: ['jasmine', 'browserify'],
        files: [
            'tests/spec.js',
            'tests/*.js',
            'tests/**/*.js'
        ],
        preprocessors: {
            'component/*.js': ['browserify'],
            'tests/*.test.js': ['browserify'],
            'tests/**/*.test.js': ['browserify'],
            'tests/**/**/*.test.js': ['browserify']
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
