require.config({
	baseUrl: 'components',
	paths: {
		jquery: (
			!document.addEventListener ? 'bower/jquery_old/jquery.min' : 'bower/jquery_new/jquery.min'
		)
	}
});

//if enquire.js is not required just load main and remove enquire.js from dependency list
//requirejs(['main']);

Modernizr.load([
	{
		test: window.matchMedia,
		nope: './components/bower/matchmedia/matchMedia.js',
		complete: function () {
			requirejs(['main']);
		} /* \complete */
	}
]); // \Modernizr.load