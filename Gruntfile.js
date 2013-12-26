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
					baseUrl: "src/js",
					mainConfigFile: "src/js/app.js",
					out: "build/js/main2.js"
				}
			}
		},

		handlebars: {
			compile: {
				options: {
					amd: true,
					namespace: false
				},
				files: {
					"build/hb/handlebars-templates.js": ["src/handlebars/*.handlebars"]
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
					linenos: true
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
	grunt.registerTask('hb', ['handlebars']);
	grunt.registerTask('min', ['cssmin']);
};