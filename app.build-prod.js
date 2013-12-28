({
	appDir: "src/components",
	baseUrl: ".",
	dir: "build/components",
	keepBuildDir: true,
	generateSourceMaps: false,
	preserveLicenseComments: false,
	fileExclusionRegExp: /^bower/,
	optimize: "uglify2",
	uglify2: {
		output: {
			beautify: false
		},
		compress: {
			global_defs: {
				DEV: false
			}
		},
		warnings: true,
		mangle: true
	},
	paths: {
		jquery: "empty:",
		jquery_old: "empty:",
		app: './vendor'
	},
	name: "main"
})