/* Author:
	nxnw.net
*/

(function ($) {
	//start of user code
	var LOCALSITE = {
		common: {
			init: function(){
				if($('html').hasClass('lt-ie9')) {
					fbg.hideFOUT('onload');
				}
				var x = 'asasda';
			}  /* \LOCALSITE.common.init */
		} /* \LOCALSITE.common */
	}; /* \LOCALSITE */

	var DOMEXEC = {
		exec: function(master, a) {
			var ns = LOCALSITE,
				action = ( a === undefined ) ? "init" : action;

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