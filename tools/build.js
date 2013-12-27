var config = require('./config.js');
var common = require('./helpers/common.js');
//start fs module
var fs = common.fs;

var src = config.src;
var build = config.build;
var dirs = config.build_dir;
var templates = config.template_dir;
var stylus = config.stylus_dir;
var handlebars = config.handlebars_dir;
var handlebars_template = config.handlebars_template;
var root_dir = config.root_dir;

//nuke build dir
fs.rmrfSync( build );

//recreate build dir
fs.mkdirSync(build, '755');

//recursively copy over build dirs config.build_dir via for loop
console.log('Building build dirs...');
for ( var i = 0, z = dirs.length; i < z; i++ ) {
  add_dir( src, build, dirs[i] );
}

//copy over root dir
fs.copyRecursive(src + '/' + root_dir, build+ '/', function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
});

//parse templates
console.log('Parsing template files...');
for ( var i = 0, z = templates.length; i < z; i++ ) {
  common.parse(src, build, templates[i]);
}

//compile stylus
console.log('Compiling stylus files...');
//set main to be var in config instead of hardcoded here
common.compile(src+'/styl/main.styl', 'build/css');

//compile handlebar templates
console.log('Compiling handlebar template files as AMD module...');
common.hb_compile_dir(false);
/*for ( var i = 0, z = handlebars.length; i < z; i++ ) {
  var src_dir = src + '/' + handlebars[i];
  common.hb_compile_dir(src_dir, build + '/js', handlebars_template);
}*/

function add_dir(src, build, path) {
  fs.copyRecursive(src + '/' + path, build+ '/' + path, function (err) {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}
