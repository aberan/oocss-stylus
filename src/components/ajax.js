var LOCALSITE_AJAX = {
	_init: function(args){
		var type = args.hasOwnProperty('type') ? args.method_type : 'POST';
		var async = args.hasOwnProperty('async') ? args.async : true;

		$.ajax( {
			url: args.url,
			type: type,
			data: args.params,
			async: async
		})
			.done( function(response) {
				var response_json = typeof response === 'object' ? response : $.parseJSON(response);
				args.callback[response_json.status](response_json.args);
			})
			.fail( function(jqXHR, textStatus, errorThrown){
				args.callback['_error'](args.params, {msg: textStatus+' - '+errorThrown});
			})
			.complete( function() {
				if ( typeof args.callback['_complete'] == 'function' ) {
					args.callback['_complete']();
				}
			});
	} /* \LOCALSITE_AJAX._init */
};