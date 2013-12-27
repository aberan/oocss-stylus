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

function compile_stylus(){
	console.log('Compiling stylus + autoprefixer');
	exec('grunt css');
}

function compile_js(file, lite) {
	console.log('Compiling js with requireJS');
	if ( lite ) {
		exec('r.js -o app.build-watch.js');
	}
	else { //need uglify because of global_defs
		exec('r.js -o app.build.js');
	}
}

function compile_handlebars(file, requireJS, lite) {
	console.log('Compiling Handlebar templates');
	exec('grunt hbs');
}


module.exports = {
		parse : parse_templates,
		parse_single : parse_single_template,
		fs : fs,
		compile : compile_stylus,
		compile_js: compile_js,
		hb_compile_dir : compile_handlebars
};
