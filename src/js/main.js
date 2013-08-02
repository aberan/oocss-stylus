/* Author:
	nxnw.net
*/

(function ($) {
	//start of user code
	var LOCALSITE = {
		common: {
			_init: function(){
				/*if($('html').hasClass('lt-ie9')) {
					fbg.hideFOUT('onload');
				}*/

				//init handle for nav
				var args = {
					el: $('#handle'),
					drawer: $('.drawer'),
					drawer_inner: $('.drawer-inner')
				};

				new nxnw.handle(args);
				var x = 'sada';
				var y = 's';

			}  /* \LOCALSITE.common.init */
		}, /* \LOCALSITE.common */

		home : {
			_init : function() {

			} /* \LOCALSITE._home.init */
		} /* \LOCALSITE._home */
	}; /* \LOCALSITE */

	var DOMEXEC = {
		exec: function(master, a) {
			var ns = LOCALSITE,
				action = ( a === undefined ) ? "_init" : action;

			if ( master !== "" && ns[master] && typeof ns[master][action] == "function" ) {
				ns[master][action]();
			}
		},

		init: function() {
			var body = document.body,
				master = $(body).data("master"),
				action = $(body).data("action");

			this.exec("common");
			this.exec(master);
			this.exec(master, action);
		}
	}; /* \DOMEXEC */

	$(document).ready(function(){
		DOMEXEC.init();
	}); // \document.rdy
})(jQuery);