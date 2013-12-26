/* since fs.watch is not recursive, need to add all directories that need to be watched individually */

var config = {
	src : 'src',
	build : 'build',
	build_dir : ['js', 'css', 'img', 'hb'],
	watch_dir : ['css', 'css/vendor', 'css/fonts', 'img', 'media'],
	template_dir : ['templates'],
	template_inc : ['includes'],
	stylus_dir : ['styl'],
	stylus_mixins : ['styl/mixins'],
	js_dir: ['js', 'js/vendor'],
	handlebars_dir : ['handlebars'],
	handlebars_template : 'handlebars-templates.js',
	root_dir: 'root'
};

module.exports = config;
