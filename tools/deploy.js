var config = require('./config.js');
var common = require('./helpers/common.js');
//start fs module
var fs = common.fs;

var src = config.src;
var deploy = config.deploy;
var dirs = config.deploy_dir;
var templates = config.template_dir;
var stylus = config.stylus_dir;
var handlebars = config.handlebars_dir;
var handlebars_template = config.handlebars_template;
var root_dir = config.root_dir;
var stylus_root = config.stylus_root;
var stylus_build_dir = config.stylus_build_dir;
var bower = config.bower;
var bower_tmp = config.bower_tmp;


//recursively copy over build dirs config.build_dir via for loop
console.log('Building deploy dirs...');

for ( var i = 0, z = dirs.length; i < z; i++ ) {
  add_dir( src, deploy, dirs[i] );
}

//copy over all bower files
for( var i = 0, z = bower.length; i < z; i++ ) {
  var file = bower[i].split('/').pop();
  fs.copy(src+'/'+bower[i], deploy+'/'+bower_tmp+'/'+file, function (err) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log('added bower file: '+file);
  });
}


function add_dir(src, deploy, path) {
  fs.copyRecursive(src + '/' + path, deploy+ '/' + path, function (err) {
    if (err) {
      console.log('failed to add_dir');
      console.log(err);
      throw err;
    }
    /*else {
      if ( path == 'css' ) {
        console.log('Compiling stylus files...');
        common.compile('deploy');
      }
    }*/
  });
}
