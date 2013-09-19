requirejs.config({
	baseUrl : 'js',
	paths : {
		jquery: ['//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min','vendor/jquery-2.0.3.min'],
		jquery_old: ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min','vendor/jquery-1.10.2.min'],
		app: 'vendor'
	},
	shim: {
		plugins: {
			deps: ['jquery']
		},
		main: {
			deps: ['jquery', 'plugins']
		}
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

requirejs(['main']);