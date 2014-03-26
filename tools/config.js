/* since fs.watch is not recursive, need to add all directories that need to be watched individually */

var config = {
	src : 'src',
	build : 'build',
	deploy: 'deploy/sites/all/themes/nxnw',
	build_dir : ['components', 'css', 'img'],
	deploy_dir: ['css', 'img'],
	push_dir: ['components', 'css', 'img'],
	watch_dir : ['css', 'css/vendor', 'css/fonts', 'img', 'media', 'components', 'components/bower', 'components/ajax'],
	template_dir : ['templates'],
	template_inc : ['includes'],
	stylus_dir : ['styl', 'styl/mixins'],
	stylus_root: 'styl/main.styl',
	stylus_build_dir: 'css',
	js_dir: ['components'],
	handlebars_dir : ['handlebars'],
	handlebars_template : 'handlebars-templates.js',
	root_dir: 'root',
	bower: ['components/bower/fastclick/lib/fastclick.js'],
	bower_tmp: 'components/tmp/bower',
	bower_push_tmp: 'components/bower'
};

module.exports = config;