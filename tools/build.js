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
var stylus_root = config.stylus_root;
var stylus_build_dir = config.stylus_build_dir;
var bower = config.bower;
var bower_tmp = config.bower_push_tmp;

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
common.compile(src + stylus_root, build + stylus_build_dir);

//compile handlebar templates
console.log('Compiling handlebar template files as AMD module...');
common.hb_compile_dir(false);

function add_dir(src, build, path) {
  fs.copyRecursive(src + '/' + path, build+ '/' + path, function (err) {
    if (err) {
      console.log(err);
      throw err;
    }
    else {
      if ( path === 'components' ) {
        //copy over all bower files after dir has been created
        for( var i = 0, z = bower.length; i < z; i++ ) {
          var file = bower[i].split('/').pop();
          fs.copy(src+'/'+bower[i], build+'/'+bower_tmp+'/'+file, function (err) {
            if (err) {
              console.log(err);
              throw err;
            }
            console.log('added bower file: '+file);
          });
        }
      }
    }
  });
}
