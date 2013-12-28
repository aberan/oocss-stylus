/* since fs.watch is not recursive, need to add all directories that need to be watched individually */

var config = {
	src : 'src',
	build : 'build',
	build_dir : ['components', 'css', 'img'],
	watch_dir : ['css', 'css/vendor', 'css/fonts', 'img', 'media'],
	template_dir : ['templates'],
	template_inc : ['includes'],
	stylus_dir : ['styl', 'styl/mixins'],
	stylus_root: 'styl/main.styl',
	stylus_build_dir: 'css',
	js_dir: ['components', 'components/vendor'],
	handlebars_dir : ['handlebars'],
	handlebars_template : 'handlebars-templates.js',
	root_dir: 'root'
};

module.exports = config;