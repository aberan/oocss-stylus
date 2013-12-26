({
    appDir: "src/js",
    baseUrl: ".",
    dir: "build/js",
    keepBuildDir: true,
    generateSourceMaps: false,
	preserveLicenseComments: false,
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