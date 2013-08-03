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

//nuke build dir
fs.rmrfSync( build );

//recreate build dir
fs.mkdirSync(build, '755');

//recursively copy over build dirs config.build_dir via for loop
for ( var i = 0, z = dirs.length; i < z; i++ ) {
  add_dir( src, build, dirs[i] );
}

//parse templates
for ( var i = 0, z = templates.length; i < z; i++ ) {
  common.parse(src, build, templates[i]);
}

//compile stylus
for ( var i = 0, z = stylus.length; i < z; i++ ) {
  common.compile_dir(src, stylus[i], build + '/css');
}

//compile handlebar templates
for ( var i = 0, z = handlebars.length; i < z; i++ ) {
  common.hb_compile_dir(src, handlebars[i], build + '/js', handlebars_template);
}

function add_dir(src, build, path) {
  fs.copyRecursive(src + '/' + path, build+ '/' + path, function (err) {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}