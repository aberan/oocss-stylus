window.requestAnimFrame = window.requestAnimFrame || (function(){ return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };})();

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


//$transition.end
!function ($) {

  $(function () {

    "use strict"; // jshint ;_;


    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  });

}(window.jQuery);

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

//enquire
// enquire.js v1.5.6 - Awesome Media Queries in JavaScript
// Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/enquire.js
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

window.enquire=function(e){"use strict";function t(e,t){var n=0,r=e.length,i;for(n;n<r;n++){i=t(e[n],n);if(i===!1)break}}function n(e){return Object.prototype.toString.apply(e)==="[object Array]"}function r(e){return typeof e=="function"}function i(e){this.initialised=!1,this.options=e,e.deferSetup||this.setup()}function s(e,t){this.query=e,this.isUnconditional=t,this.handlers=[],this.matched=!1}function o(){if(!e)throw new Error("matchMedia is required");var t=new s("only all");this.queries={},this.listening=!1,this.browserIsIncapable=!t.matchMedia()}return i.prototype={setup:function(e){this.options.setup&&this.options.setup(e),this.initialised=!0},on:function(e){this.initialised||this.setup(e),this.options.match(e)},off:function(e){this.options.unmatch&&this.options.unmatch(e)},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(e){return this.options===e||this.options.match===e}},s.prototype={matchMedia:function(){return e(this.query).matches},addHandler:function(e,t){var n=new i(e);this.handlers.push(n),t&&this.matched&&n.on()},removeHandler:function(e){var n=this.handlers;t(n,function(t,r){if(t.equals(e))return t.destroy(),!n.splice(r,1)})},assess:function(e){this.matchMedia()||this.isUnconditional?this.match(e):this.unmatch(e)},match:function(e){if(this.matched)return;t(this.handlers,function(t){t.on(e)}),this.matched=!0},unmatch:function(e){if(!this.matched)return;t(this.handlers,function(t){t.off(e)}),this.matched=!1}},o.prototype={register:function(e,i,o){var u=this.queries,a=o&&this.browserIsIncapable,f=this.listening;return u.hasOwnProperty(e)||(u[e]=new s(e,a),this.listening&&u[e].assess()),r(i)&&(i={match:i}),n(i)||(i=[i]),t(i,function(t){u[e].addHandler(t,f)}),this},unregister:function(e,n){var r=this.queries;return r.hasOwnProperty(e)?(n?r[e].removeHandler(n):(t(this.queries[e].handlers,function(e){e.destroy()}),delete r[e]),this):this},fire:function(e){var t=this.queries,n;for(n in t)t.hasOwnProperty(n)&&t[n].assess(e);return this},listen:function(e){function n(n){var r;window.addEventListener(n,function(n){r&&clearTimeout(r),r=setTimeout(function(){t.fire(n)},e)},!1)}var t=this;return e=e||500,this.listening?this:(window.addEventListener&&(n("resize"),n("orientationChange")),t.fire(),this.listening=!0,this)}},new o}(window.matchMedia);


// Place any jQuery/helper plugins in here.
var nxnw=nxnw||{};!function(t){var i=this.handle=function(i,e){this.options=t.extend({},this.defaults,e),this.$el=i.el,this.$drawer=i.drawer,this.$drawer_inner=i.drawer_inner,this.drawer_height=0,this.open=!1,this.transitioning=!1,this.window_width=t(window).width(),this._callback=i.hasOwnProperty("callback")?i.callback:!1,this._complete=i.hasOwnProperty("complete")?i.complete:!1,this._init(this.callback,this.callback_args)};i.prototype={defaults:{overflow:!1,height:"auto",duration:2e3},_init:function(){this.drawer_height=this.$drawer_inner.outerHeight(!1);var i=this;this.$el.on("click",function(t){t.preventDefault(),i._set_height(i.open?0:i.drawer_height,i.open)}),t.support.transition&&this.$drawer.on(t.support.transition.end,function(){i.transitioning=!1,i.options.overflow&&i.open&&i.$drawer.addClass("open"),i._complete&&i._complete()}),t(window).on("resize",t.throttle(250,function(){var e=t(window).width();e!==i.window_width&&i._update()})),this._callback&&this._callback()},_update:function(){this.drawer_height=this.$drawer_inner.outerHeight(!1),this.open&&this._set_height(this.drawer_height,null)},_set_height:function(t,i){this.open&&this.options.overflow&&this.$drawer.removeClass("open");var e=i?t:"auto"==this.options.height?t:this.options.height;if(this.transitioning=!0,Modernizr.csstransitions)this.$drawer.height(e);else{var n=this;this.$drawer.animate({height:e},n.options.duration,function(){n.transitioning=!1,n._complete&&n._complete()})}null!==i&&(this.$el.toggleClass("active"),this.$drawer.toggleClass("active"),this.open=i?!1:!0)},_override_height:function(t){this.$drawer_inner.css("height",t)},_open:function(){this.$el.trigger("click")},_close:function(t){t&&this.$drawer.addClass("immediate"),this.$el.trigger("click")},_create:function(){},_destroy:function(){},_set_opt:function(t,i){this.options.hasOwnProperty(t)&&(this.options[t]=i)},_get:function(t){return this[t]}}}.apply(nxnw,[jQuery]);
