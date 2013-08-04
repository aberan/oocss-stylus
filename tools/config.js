/* since fs.watch is not recursive, need to add all directories that need to be watched individually */

var config = {
	src : 'src',
	build : 'build',
	build_dir : ['js', 'css', 'img'],
	watch_dir : ['js', 'js/vendor', 'css', 'css/vendor', 'img'],
	template_dir : ['templates'],
	template_inc : ['includes'],
	stylus_dir : ['styl'],
	stylus_mixins : ['styl/mixins'],
	handlebars_dir : ['handlebars'],
	handlebars_template : 'handlebars-templates.js'
};

module.exports = config;
