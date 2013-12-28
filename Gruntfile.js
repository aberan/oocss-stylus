module.exports = function(grunt) {
	grunt.initConfig({

		autoprefixer: {
			single_file: {
				src: 'build/css/main.css'
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
				src: 'build/css/main.css',
				dest: 'build/css/main.css',
			}
		},

		stylus: {
			compile: {
				options: {
					compress: false,
					linenos: true,
					"include css": true,
					paths: ['build/components/bower/']
				},
				files: {
					'build/css/main.css': 'src/styl/main.styl'
				}
			}
		},

		uglify: {
			my_target: {
				files: {
					'build/components/bower/modernizr/modernizr.js': 'src/components/bower/modernizr/modernizr.js',
					'build/components/bower/yepnope/yepnope.js': 'src/components/bower/yepnope/yepnope.js',
					'build/components/bower/requirejs/require.js': 'src/components/bower/requirejs/require.js'
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

	//register tasks
	grunt.registerTask('css', ['stylus', 'autoprefixer']);
	grunt.registerTask('default', ['css']);
	grunt.registerTask('hbs', ['handlebars']);
	grunt.registerTask('min', ['cssmin', 'uglify']);
};