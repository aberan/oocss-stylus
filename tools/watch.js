var config = require('./config.js');
var common = require('./helpers/common.js');
//start fs module
var fs = common.fs;

var dirs = config.watch_dir;
var src = config.src;
var build = config.build;
var templates = config.template_dir;
var template_includes = config.template_inc;
var stylus = config.stylus_dir;
var js = config.js_dir;
var mixins = config.stylus_mixins;
var handlebars = config.handlebars_dir;
var handlebars_template = config.handlebars_template;
var root = config.root_dir;

//loop through all config.watch_dir and add watch_handler...
for ( var i = 0, z = dirs.length; i < z; i++ ) {
  add_dir( src + '/' + dirs[i], dirs[i] );
}

//add root dir
fs.watch(src + '/' + root, function(e, file) {
  watch_root_handle(e, root, file);
});

//watch template dir
for ( var i = 0, z = templates.length; i < z; i++ ) {
  add_template_dir( src + '/' + templates[i], templates[i] );
}

//watch template include files
for ( var i = 0, z = template_includes.length; i < z; i++ ) {
  add_template_inc_dir( src + '/' + template_includes[i] );
}

//watch stylus dir
for ( var i = 0, z = stylus.length; i < z; i++ ) {
  add_stylus_dir( src + '/' + stylus[i], stylus[i] );
}

//watch mixins dir
for ( var i = 0, z = mixins.length; i < z; i++ ) {
  add_mixins_dir( src + '/' + mixins[i] );
}

//watch js dir
for ( var i = 0, z = js.length; i < z; i++ ) {
  add_js_dir( src + '/' + js[i]);
}

//watch handlebars dir
for ( var i = 0, z = handlebars.length; i < z; i++ ) {
  add_handlebars_dir( src + '/' + handlebars[i] );
}

/* functions to init watch functionality */
function add_dir(dir, path) {
  fs.watch(dir, function(e, file) {
    watch_handle(e, path, file);
  });
}

function add_template_dir(dir, path) {
  fs.watch(dir, function(e, file) {
    watch_template_handle(e, path, file);
  });
}

function add_stylus_dir(dir, path ) {
  fs.watch(dir, function(e, file) {
    watch_stylus_handle(e, path, file);
  });
}

function add_js_dir(dir) {
  fs.watch(dir, function() {
    rebuild_js();
  });
}

function add_template_inc_dir(dir) {
  fs.watch(dir, function() {
    rebuild_templates( templates );
  });
}

function add_mixins_dir(dir) {
  fs.watch(dir, function() {
    rebuild_stylus( stylus );
  });
}

function add_handlebars_dir(dir) {
  fs.watch(dir, function() {
    rebuild_handlebars( dir, handlebars_template );
  });
}




/* watch callbacks */
function watch_template_handle(e, path, file) {
  if (file) {
    var stats;
    var src_file = src+'/'+path+'/'+file;

    fs.exists(src_file, function (exists) {
      if ( exists ) {
        console.log('template changed: '+file);
        var src_path = src + '/' + path;
        var build_path = build + '/';

        common.parse_single(src_path, build_path, file);
      }
      else { //removed, nuke .html equivalent
        var html_file = file.replace(/\.(handlebars|hbs)$/, '.html');
        console.log('removed: '+file);
        fs.rmrfSync( build+'/' + html_file );
      }
    });
  }
  else {
    console.log('template not provided');
  }
}

function watch_root_handle(e, path, file) {

  var src_file = src+'/'+path+'/'+file;
  var build_file = build+'/'+file;

  if (file) {
    var stats;
    fs.exists(src_file, function (exists) {
      if ( exists ) {
        stats = fs.statSync(src_file);
        //dont copy the file if it is a system file
        if ( /^\./.test( file ) ) {
          console.log('system file, ignoring');
        }
        else { //legit, copy
          if ( e == 'rename' ) { //new file
            console.log('new file');
            if ( /\.(gif|png|jpg|jpeg|svg|svgz)$/.test( file ) ) { //binary file, check if exists in build dir, if so delete first before copying over
              fs.exists(build_file, function (exists) {
                if ( exists ) {
                  console.log('deleting existing image before copying over new image');
                  //delete build file, then copy over updated image
                  fs.unlinkSync(build_file);
                }
                fs.copy(src_file, build_file, function (err) {
                  if (err) {
                    console.log(err);
                    throw err;
                  }
                  console.log('added file: '+file);
                });
              });
            }
            else { // non-binary file, simply copy over
              fs.copy(src_file, build_file, function (err) {
                if (err) {
                  console.log(err);
                  throw err;
                }
                console.log('added file: '+file);
              });
            }
          }
          else { //file updated
            console.log('updated files');
            //delete existing file in build
            fs.unlinkSync(build_file);
            fs.copy(src_file, build_file, function (err) {
              if (err) {
                console.log(err);
                throw err;
              }

              console.log('updated file: '+file);
            });
          }
        }
      }
      else { //removed
        console.log('removed: '+file);
        fs.rmrfSync( build+'/' + file );
      }
    });
  }
  else {
    console.log('file not provided');
  }
}

function watch_handle(e, path, file) {

  var src_file = src+'/'+path+'/'+file;
  var build_file = build+'/'+path+'/'+file;

  if (file) {
    var stats;
    fs.exists(src_file, function (exists) {
      if ( exists ) {
        stats = fs.statSync(src_file);
        if ( stats.isDirectory() ) { //dir
          //if directory, recursively cp
          fs.copyRecursive(src_file, build_file, function (err) {
            if (err) {
              console.log(err);
              throw err;
            }
            console.log('added dir: '+file);
          });
        }
        else { //file
          //dont copy the file if it is a system file
          if ( /^\./.test( file ) ) {
            console.log('system file, ignoring');
          }
          else { //legit, copy
            if ( e == 'rename' ) { //new file
              console.log('new file');
              if ( /\.(gif|png|jpg|jpeg|svg|svgz)$/.test( file ) ) { //binary file, check if exists in build dir, if so delete first before copying over
                fs.exists(build_file, function (exists) {
                  if ( exists ) {
                    console.log('deleting existing image before copying over new image');
                    //delete build file, then copy over updated image
                    fs.unlinkSync(build_file);
                  }
                  fs.copy(src_file, build_file, function (err) {
                    if (err) {
                      console.log(err);
                      throw err;
                    }
                    console.log('added file: '+file);
                  });
                });
              }
              else { // non-binary file, simply copy over
                fs.copy(src_file, build_file, function (err) {
                  if (err) {
                    console.log(err);
                    throw err;
                  }
                  console.log('added file: '+file);
                });
              }
            }
            else { //file updated
              console.log('updated files');
              //delete existing file in build
              fs.unlinkSync(build_file);
              fs.copy(src_file, build_file, function (err) {
                if (err) {
                  console.log(err);
                  throw err;
                }

                console.log('updated file: '+file);
              });
            }
          }
        }
      }
      else { //removed
        console.log('removed: '+file);
        fs.rmrfSync( build+'/' + file );
      }
    });
  }
  else {
    console.log('file not provided');
  }
}

//clean up function to work with only compiling main.styl
function watch_stylus_handle(e, path, file) {
  var src_file = src+'/'+path+'/'+file;
  var build_dir = build + '/css';

  //testing just compiling main.styl everytime since it imports all other files
  src_file = src+'/'+path+'/main.styl';

  if (file) {
    var stats;
    fs.exists(src_file, function (exists) {
      if ( exists ) {
        stats = fs.statSync(src_file);

        //dont copy the file if it is a system file
        if ( /^\./.test( file ) ) {
          console.log('system file, ignoring');
        }
        else { //legit, compile
          //console.log('compiling: '+file);
          console.log('start compiling main.styl');
          common.compile(src_file, build_dir);
        }
      }
      else { //removed
        console.log('removed: '+file);
        fs.rmrfSync( build_dir + '/' + file.replace(/\.styl$/, '.css' ) );
      }
    });
  }
  else {
    console.log('file not provided');
  }
}

function rebuild_stylus( stylus ) {
  //loop through all stylus directories, rebuilding the templates
  for ( var i = 0, z = stylus.length; i < z; i++ ) {
    console.log('Rebuilding stylus files ...');
    common.compile_dir(src, stylus[i], build + '/css');
  }
}

function rebuild_js () {
  //exec requireJS optimizer
  common.compile_js();
}

function rebuild_handlebars( dir, template_file ) {
  console.log('Compiling handlebars template files ...');
  common.hb_compile_dir(dir, build + '/js', template_file);
}

function rebuild_templates( templates ) {
  //loop through all template directories, rebuilding the templates
  for ( var i = 0, z = templates.length; i < z; i++ ) {
    console.log('Rebuilding templates ...');
    common.parse(src, build, templates[i]);
  }
}
