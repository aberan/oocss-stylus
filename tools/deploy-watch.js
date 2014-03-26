var config = require('./config.js');
var common = require('./helpers/common.js');
var exec = require('child_process').exec;
//start fs module
var fs = common.fs;

var dirs = config.watch_dir;
var src = config.src;
var build = config.deploy;
var templates = config.template_dir;
var template_includes = config.template_inc;
var stylus = config.stylus_dir;
var js = config.js_dir;
var handlebars = config.handlebars_dir;
var handlebars_template = config.handlebars_template;
var root = config.root_dir;

//loop through all config.watch_dir and add watch_handler...
for ( var i = 0, z = dirs.length; i < z; i++ ) {
  add_dir( src + '/' + dirs[i], dirs[i] );
}

//watch stylus dir
for ( var i = 0, z = stylus.length; i < z; i++ ) {
  add_stylus_dir( src + '/' + stylus[i], stylus[i] );
}

//watch js dir
/*for ( var i = 0, z = js.length; i < z; i++ ) {
  add_js_dir( src + '/' + js[i] );
}*/

/* functions to init watch functionality */
function add_dir(dir, path) {
  fs.watch(dir, function(e, file) {
    watch_handle(e, path, file);
  });
}

/*function add_js_dir(dir) {
  fs.watch(dir, function(e, file ) {
    if ( file && !( /^\./.test( file ) ) ) {
      rebuild_js( file );
    }
  });
}*/

function add_stylus_dir(dir, path ) {
  fs.watch(dir, function(e, file) {
    watch_stylus_handle(e, path, file);
  });
}


/* watch callbacks */
function watch_handle(e, path, file) {

  var src_file = src+'/'+path+'/'+file;
  var build_file = build+'/'+path+'/'+file;

  if ( file && !( /^\./.test( file ) ) ) {
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
}

//clean up function to work with only compiling main.styl
function watch_stylus_handle(e, path, file) {
  var src_file = src+'/'+path+'/'+file;

  if ( file && !( /^\./.test( file ) ) ) {
    var stats;
    fs.exists(src_file, function (exists) {
      if ( exists ) {
        console.log('start compiling main.styl');
        //common.compile('deploy');
        exec('grunt modjs --env=deploy');
      }
    });
  }
}

/*function rebuild_js (file) {
  console.log('Deploying updated JS - '+file);
  if ( !( /^\./.test( file ) ) ) {
    common.compile_js( file, false);
  }
}*/