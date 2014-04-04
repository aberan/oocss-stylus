var deploy = false,
 srcPath = deploy ? '/sites/all/themes/nxnw/components/' : '/components/';

require.config({
	baseUrl: srcPath,
	paths: {
		app: '/sites/all/themes/nxnw/components/',
		jquery: (
			!document.addEventListener ? 'jquery.old.min' : 'jquery.min'
		)
	},
	urlArgs: "1"
});

//if enquire.js is not required just load main and remove enquire.js from dependency list
//requirejs(['main']);

//change
Modernizr.load([
	{
		test: window.matchMedia,
		nope: srcPath + 'matchMedia.min.js',
		complete: function () {
			requirejs(['main']);
		} /* \complete */
	}
]); // \Modernizr.load