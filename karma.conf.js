// Karma configuration
// Generated on Fri Jan 09 2015 07:42:33 GMT-0700 (MST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
			{
				pattern: 'node_modules/canopy-styleguide/build/*.eot',
				watched: true,
				included: false,
				served: true
			},
			{
				pattern: 'node_modules/canopy-styleguide/build/*.ttf',
				watched: true,
				included: false,
				served: true
			},
			{
				pattern: 'node_modules/canopy-styleguide/build/*.woff',
				watched: true,
				included: false,
				served: true
			},
			'node_modules/canopy-styleguide/build/styleguide.css',
			'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.js',
			'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js',
			'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.0/lodash.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'src/index.js',
			'src/*spec.js',
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'src/index.js': ['webpack'],
    },


	webpack: {
		output: {
			filename: 'cp-multi-selector.js',
		},
		module: {
			loaders: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, {
				test: /\.css$/,
				loader: "style-loader!css-loader!autoprefixer"
			}, {
				test: /\.html$/,
				loader: "html-loader"
			}]
		},
		externals: {
			'angular': 'angular',
			'lodash': '_',
			'jquery': '$',
		}
	},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
