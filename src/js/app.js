requirejs.config({
	baseUrl : 'js',
	paths : {
		jquery: ['//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min','vendor/jquery-2.0.3.min'],
		jquery_old: ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min','vendor/jquery-1.10.2.min'],
		app: 'vendor',
		hb: '/hb'
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

Modernizr.load([
	{
		test: window.matchMedia,
		nope: 'js/vendor/matchmedia-2.0.2.min.js',
		complete: function () {
			requirejs(['main']);
		} /* \complete */
	}
]); // \Modernizr.load