({
	appDir: "src/components",
	baseUrl: ".",
	dir: "build/components",
	keepBuildDir: true,
	preserveLicenseComments: false,
	fileExclusionRegExp: /^bower/,
	optimize: "uglify2",
	uglify2: {
		output: {
			beautify: true
		},
		compress: {
			global_defs: {
				DEV: true
			},
			sequences: false,
			properties: false,
			dead_code: false,
			drop_debugger: false,
			conditionals: false,
			comparisons: false,
			evaluate: false,
			booleans: false,
			loops: false,
			unused: false,
			hoist_funs: false,
			if_return: false,
			join_vars: false,
			cascade: false,
			side_effects: false,
			warnings: false
		},
		warnings: true,
		mangle: false
	},
	paths: {
		jquery: "empty:",
		jquery_old: "empty:",
		app: './vendor'
	},
	name: "main"
})