module.exports = function(grunt) {
	grunt.initConfig({

		autoprefixer: {
			single_file: {
				src: 'build/css/main.css'
			}
		},

		requirejs: {
			compile: {
				options: {
					mainConfigFile: "app.build-prod.js",
					dir: "build/js"
				}
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
					"src/js/handlebars-templates.js": ["src/handlebars/*.hbs"]
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
					paths: ['build/js/bower/']
				},
				files: {
					'build/css/main.css': 'src/styl/main.styl'
				}
			}
		}

	});

	// css tasks
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	//js tasks
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	//hbs tasks
	grunt.loadNpmTasks('grunt-contrib-handlebars');

	//register tasks
	grunt.registerTask('css', ['stylus', 'autoprefixer']);
	grunt.registerTask('js', ['requirejs']);
	grunt.registerTask('default', ['css']);
	grunt.registerTask('hbs', ['handlebars']);
	grunt.registerTask('min', ['cssmin']);
};