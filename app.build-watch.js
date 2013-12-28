({
	appDir: "src/components",
	baseUrl: ".",
	dir: "build/components",
	keepBuildDir: true,
	preserveLicenseComments: false,
	fileExclusionRegExp: /^bower/,
	optimize: "none",
	paths: {
		jquery: "empty:",
		jquery_old: "empty:",
		app: './vendor'
	},
	name: "main"
})