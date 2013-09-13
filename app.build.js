({
		appDir: "src/js",
    baseUrl: ".",
    dir: "build/js",
    //mainConfigFile: 'src/js/app.js',
    //out: "build/js/main-built.js",
    //name: '../../../src/js/app.js',
    paths: {
        jquery: "empty:",
        jquery_old: "empty:",
        app: './vendor'
    },
    shim : {
			main : {
				deps : ['jquery', 'plugins']
			}
		},
		modules: [
        {
            name: "main"
        }
    ]
})