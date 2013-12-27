({
	appDir: "src/js",
	baseUrl: ".",
	dir: "build/js",
	keepBuildDir: true,
	preserveLicenseComments: false,
	optimize: "none",
	paths: {
		jquery: "bower/jquery_new/jquery",
		app: './vendor'
	},
	name: "bower/almond/almond",
	include: ['main'],
	insertRequire: ['main'],
	wrap: true
})