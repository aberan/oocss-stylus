/* Author:
	nxnw.net
*/
"use strict";

define(function(require){
  var jQuery = require('jquery');
  var tmpl = require('handlebars-templates');

	(function ($) {
		//start of user code
		var LOCALSITE = {
			common: {
				init: function(){
					//sample handlebars code
					// var nav = tmpl['link'];
					// var context = {
					// 	links : [
					// 		{ title: 'Catalog', url: 'catalog.html' },
					// 		{ title: 'Inspiration', url: 'inspiration.html' },
					// 		{ title: 'Help', url: 'help.html' },
					// 		{ title: 'Contact', url: 'contact.html' }
					// 	]
					// };
					// $('#main-menu').html(nav(context));
				}  /* \LOCALSITE.common.init */
			}, /* \LOCALSITE.common */

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
				var $main = $('#main'), master = $main.data("master"), action = $main.data("action");

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