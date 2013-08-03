var fs = require('../node_modules/fs.extra');
var Html = require('html');
var exec = require('child_process').exec;
var handlebars = require('../node_modules/handlebars');
require('./handlebars.helpers.js').init(handlebars);
require('./handlebars.include.js').init(handlebars);

function fix_path(str, path) {
    return str.replace(/(src|href)="(libs|css|scripts?|docs?)(\/|\.)/g, '$1="' + path + '$2$3');
}

function parse_templates(src, build, dir) {
  var src_path = src + '/' + dir;
  var build_path = build + '/';

  fs.mkdirRecursive( build_path, function () {
    // loop on each file in folder srcPath and check what to do.
    fs.readdirSync( src_path ).forEach( function ( file ) {
        // if handlebars file, do treatment on the file
        if (/handlebars|hbs/.test( file )) {
            var src_file = src_path + '/' + file;
            var build_file = build_path + '/' + file.replace(/\.(handlebars|hbs)$/, '.html');
            var src_content = fs.readFileSync(src_file, 'utf8');
            src_content = handlebars.parseIncludes(src_content, src_path);
            src_content = fix_path(src_content, '../');
            fs.writeFileSync(build_file, src_content);
        }
        else {
            fs.copy(src_path + file, build_path + file);
        }
    });
  });
}

function parse_single_template(src_path, build_path, file) {
	if (/handlebars|hbs/.test( file )) {
		var src_file = src_path + '/' + file;
		var build_file = build_path + '/' + file.replace(/\.(handlebars|hbs)$/, '.html');
		var src_content = fs.readFileSync(src_file, 'utf8');
		src_content = handlebars.parseIncludes(src_content, src_path);
		src_content = fix_path(src_content, '../');
		fs.writeFileSync(build_file, src_content);
	}
	else {
		fs.copy(src_path + file, build_path + file);
	}
}

function compile_stylus_dir(src, dir, build_dir){
	var src_path = src + '/' + dir;

	fs.readdirSync( src_path ).forEach( function ( file ) {
		var src_file = src_path + '/' + file;
		//make sure we are looking at a .styl file
		if ( /^(.)+\.styl/.test( file ) ) {
			//compile stylus
			exec('stylus '+ src_file + ' -o ' +build_dir);
		}
	});
}

function compile_stylus(src_file, build_dir){
	exec('stylus '+ src_file + ' -o ' +build_dir);
}

function compile_handlebars(src, dir, build_dir, template_file) {
	exec('handlebars ' + src + dir + '/*.handlebars -f ' + build_dir + '/' + template_file + ' -k each -k if -k unless');
}


module.exports = {
		parse : parse_templates,
		parse_single : parse_single_template,
		fs : fs,
		compile_dir: compile_stylus_dir,
		compile : compile_stylus,
		hb_compile_dir : compile_handlebars
};
