/* Author:
	nxnw.net
*/
"use strict";

define(function(require){
  var jQuery = require('jquery');
  require('console');
  require('raf');
  require('transition.end-3.0.3');
  require('enquire.min');
  require('throttle-debounce');
  require('bower/fastclick');
  //remove once moved on backend
  require('template');

	(function ($) {
		//start of user code
		var LOCALSITE = {
			common: {
				init: function(){
					//init fastclick
					FastClick.attach(document.body);
				}  /* \LOCALSITE.common.init */
			} /* \LOCALSITE.common */
		}; /* \LOCALSITE */

		var DOMEXEC = {
			exec: function(master, a) {
				var ns = LOCALSITE,
					action = ( a === undefined ) ? "init" : a;

				if ( master !== "" && ns[master] && typeof ns[master][action] == "function" ) {
					ns[master][action]();
				}
			},

			init: function() {
				var $main = $('#main'),
					master = $main.data("master"),
					action = $main.data("action");

				this.exec("common");
				this.exec(master);
				this.exec(master, action);
			}
		}; /* \DOMEXEC */

		$(document).ready(function(){
			DOMEXEC.init();
		}); // \document.rdy

	})(window.jQuery);

});