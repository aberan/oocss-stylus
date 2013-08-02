var LOCALSITE_AJAX = {
	_init: function(args){
		var type = args.hasOwnProperty('type') ? args.method_type : 'POST';
		var async = args.hasOwnProperty('async') ? args.async : true;

		$.ajax( {
			url: args.url,
			type: type,
			data: args.params,
			async: async,
			success: function(response) {
				var response_json = $.parseJSON(response);
				//args.callback[response_json.status](args.callback_params, response_json.args);
				args.callback[response_json.status](response_json.args);
			},
			error: function(jqXHR, textStatus, errorThrown){
				args.callback['_error'](args.params, {msg: textStatus+' - '+errorThrown});
			}
		} ); // \ajax
	} /* \LOCALSITE_AJAX._init */
};