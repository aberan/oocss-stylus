module.exports = function(grunt) {
	grunt.initConfig({
	path: grunt.option('env') === 'deploy' ? 'deploy/sites/all/themes/nxnw' : 'build',

		autoprefixer: {
			single_file: {
				src: '<%= path %>/css/main.css'
			}
		},

		handlebars: {
			compile: {
				options: {
					amd: true,
					namespace: 'tmpl',
					processName: function(filePath) {
						return filePath.split('/').pop().split(".")[0];
					},
					compilerOptions: {
						knownHelpersOnly: true
					}
				},
				files: {
					"src/components/handlebars-templates.js": ["src/handlebars/*.hbs"]
				}
			}
		},

		cssmin: {
			minify: {
				src: '<%= path %>/css/main.css',
				dest: '<%= path %>/css/main.css'
			},
			fonts: {
				src: '<%= path %>/css/fonts.css',
				dest: '<%= path %>/css/fonts.css'
			}
		},

		stylus: {
			compile: {
				options: {
					compress: false,
					linenos: true,
					"include css": true,
					paths: ['src/components/bower/normalize-css/', 'src/css/vendor/']
				},
				files: {
					'<%= path %>/css/main.css': 'src/styl/main.styl'
				}
			}
		},

		uglify: {
			my_target: {
				files: {
					'<%= path %>/components/modernizr.min.js': 'src/components/bower/modernizr/modernizr.tmp.js',
					'<%= path %>/components/matchMedia.min.js': 'src/components/bower/matchmedia/matchMedia.js',
					'<%= path %>/components/require.min.js': 'src/components/bower/requirejs/require.js',
					'<%= path %>/components/jquery.old.min.js': 'src/components/bower/jquery_old/jquery.min.js',
					'<%= path %>/components/jquery.min.js': 'src/components/bower/jquery_new/dist/jquery.min.js'
				}
			}
		},

		modernizr: {
			bust: {
				"devFile": 'src/components/bower/modernizr/modernizr.js',
				"outputFile": 'src/components/bower/modernizr/modernizr.tmp.js',
				"extra" : {
					"shiv" : true,
					"printshiv" : false,
					"load" : true,
					"mq" : false,
					"cssclasses" : true
				},
				"extensibility" : {
					"addtest" : true,
					"prefixed" : true,
					"teststyles" : true,
					"testprops" : true,
					"testallprops" : true,
					"hasevents" : true,
					"prefixes" : true,
					"domprefixes" : true
				},
				"uglify" : false,
				"parseFiles" : true,
				"tests": ['csstransitions', 'flexbox', 'touch', 'csstransforms', 'cssanimations'],
				"files": {
					"src": ['<%= path %>/components/main.js', '<%= path %>/css/main.css']
				}
			}
		}

	});

	// css tasks
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	//js tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//hbs tasks
	grunt.loadNpmTasks('grunt-contrib-handlebars');

	//modernizr optimizer tasks
	grunt.loadNpmTasks("grunt-modernizr");

	//register tasks
	var env = grunt.option('env') || 'dev';

	grunt.registerTask('modjs', ['stylus', 'modernizr:bust', 'autoprefixer', 'uglify']);
	grunt.registerTask('modcss', ['stylus', 'modernizr:bust', 'autoprefixer']);
	grunt.registerTask('css', ['stylus', 'autoprefixer']);
	grunt.registerTask('default', ['css']);
	grunt.registerTask('prefixer', ['autoprefixer']);
	grunt.registerTask('hbs', ['handlebars']);
	grunt.registerTask('min', ['stylus', 'modernizr:bust', 'autoprefixer', 'cssmin', 'uglify']);
	grunt.registerTask('dev', ['modernizr:bust', 'uglify']);
};