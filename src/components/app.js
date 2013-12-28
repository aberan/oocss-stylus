requirejs.config({
	baseUrl : 'components',
	paths : {
		app: 'vendor',
		bower: 'bower',
		jquery: 'bower/jquery_new/jquery.min',
		jquery_old: 'bower/jquery_old/jquery.min'
	},
	shim: {
	}
});

if( !document.addEventListener ) {
	requirejs.config({
		map: {
			'*': {
				jquery: 'jquery_old'
			}
		}
	});
}

//if enquire.js is not required just load main and remove enquire.js from dependency list
//requirejs(['main']);

yepnope([
	{
		test: window.matchMedia,
		nope: './components/bower/matchmedia/matchMedia.js',
		complete: function () {
			requirejs(['main']);
		} /* \complete */
	}
]); // \yepnope