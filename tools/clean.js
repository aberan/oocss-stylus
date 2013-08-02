var config = require('./config.js');
//start fs module
var fs = require('fs.extra');

var src = config.src;
var build = config.build;

//nuke build dir
fs.rmrfSync( build );

//create just empty build dir
fs.mkdirSync(build, '755');