({
	appDir: "src/components",
	baseUrl: ".",
	dir: "deploy/sites/all/themes/nxnw/components/tmp",
	keepBuildDir: true,
	generateSourceMaps: true,
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