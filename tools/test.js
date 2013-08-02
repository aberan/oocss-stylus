console.log('test js!!');


//
// Require our fs lib, not the original.
//
//var fs = require('../node_modules/node-fs/lib/fs');
var fs = require('../node_modules/fs.extra');

fs.watch('a',  function(e, file) {
	console.log('event is: ' + e);
  if (file) {
    fs.copyRecursive('a', 'b', function (err) {
			if (err) {
				console.log(err);
				throw err;
			}
			console.log("Copied './foo' to './bar");
		});


  } else {
    console.log('filename not provided');
  }
});


fs.watch('c',  function(e, file) {
	console.log('event is: ' + e);
  if (file) {
    fs.copyRecursive('c', 'd', function (err) {
			if (err) {
				console.log(err);
				throw err;
			}
			console.log("Copied './foo' to './bar");
		});


  } else {
    console.log('filename not provided');
  }
});


/*
fs.mkdir('a/b', 0777, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Directory created - a/b');
  }
});

fs.mkdir('tmp/example_dir/first/second/third/fourth/fifth', 0777, true, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Directory created');
  }
});

fs.mkdirSync('tmp/example_sync/first/second/third/fourth/fifth', 0777, true);
*/