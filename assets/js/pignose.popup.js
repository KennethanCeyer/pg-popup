/****************************************
*
*  - PIGNOSE Popup JS
*  - DATE    2014-10-31
*  - AUTHOR  PIGNOSE
*  - VERSION 0.0.2
*  - LICENCE MIT
*
****************************************/

(function($) {
	// Plugin common configuration.
	var _config = {
		name:       'PIGNOSE Popup JS',
		createDate: '2014-10-31',
		updateDate: '2014-10-31',
		version:    '0.0.2',
		author:     'kenneth ceyer',
		email:      'kennethan@nhpcw.com',
		dev:        {
			handler: '.pignosePopupHandler'
		},
		plugin:     {
			item:      null,
			tint:      null,
			doc:       true
		}
	};

	// Abstract OOP plugin struct.
	var _interface = {
		_throw: function(error, errno) {
			$.error("'" + _config.name + "' load failed (" + errno + "): " + error);
		},
		_bind: function(object, handler, func, iife) {
			var _handler = handler.replace(/(\w+(?=\s)?)/gi, '$1' + _config.dev.handler), niife = niife || false;
			object.unbind(_handler).bind(_handler, func);
			if(!!iife === true) {
				object.triggerHandler(_handler);
			}
			return object;
		},
		_unbind: function(object, handler) {
			var _handler = handler.replace(/(\w+(?=\s)?)/gi, '$1' + _config.dev.handler), niife = niife || false;
			object.unbind(_handler);
		},
		_trigger: function(object, handler) {
			var _handler = handler.replace(/(\w+(?=\s)?)/gi, '$1' + _config.dev.handler);
			object.triggerHandler(_handler);
		},
		_excute: function(func, args) {
			if(typeof func === 'function' && func != null) {
				func.call(_config.plugin.item, args);
			}
		},
		_extend: function(object, func) {
			var _args = arguments;
			if(typeof object === 'object' && object != null) {
				object[func] = function() {
					_interface[func].apply(this, Array.prototype.slice.call(_args, 2));
				};
			}
		},
		// Define contruction method.
		init: function(options) {
			var opt = $.extend({
				time:      300,
				tint:      '#000000',
				opacity:   0.6,
				zIndex:    1000000,
				btn_close: '.btn_close'
			}, options), $this = $(this);
			_config.plugin.item = $this;
			_interface._excute(_interface.open, opt);

			return $this;
		},
		setTint: function(opt) {
			if($('.pignose_tint').length < 1) {
				var $pignose_tint = $('<div class="pignose_tint">&nbsp;</div>');
				$pignose_tint.hide();
			}
			else {
				var $pignose_tint = $('.pignose_tint');
			}

			$pignose_tint.css({
				position:        'absolute',
				left:            '0',
				top:             '0',
				width:           '100%',
				height:          '100%',
				padding:         '0',
				margin:          '0',
				fontSize:        '0',
				zIndex:          opt.zIndex,
				backgroundColor: opt.tint,
				opacity:         opt.opacity
			});

			_interface._bind($pignose_tint, 'click', function() {
				_interface._excute(_interface.close, opt);
			});

			$pignose_tint.appendTo('body');
			$pignose_tint.stop().fadeIn(opt.time);
			_config.plugin.tint = $pignose_tint;
		},
		setPopup: function(opt) {
			var $window = $(window);
			var $this   = this.each(function() {
				var $this = $(this);
				$this.css({
					position: 'absolute',
					zIndex:   opt.zIndex + 1
				}).stop().fadeIn(opt.time);
				
			});
			_interface._bind($window, 'resize', function() {
				$this.each(function() {
					var $this = $(this);
					$this.css({
						left: ($window.width()  - $this.outerWidth(true))  / 2,
						top:  ($window.height() - $this.outerHeight(true)) / 2
					});
				});
			}, true);
			_interface._bind($this, 'click', function(event) {
				event.stopPropagation();
			});
			_interface._bind($this.find(opt.btn_close), 'click', function() {
				_interface._excute(_interface.close, opt);
			});
		},
		open: function(opt) {
			_interface._excute(_interface.setTint, opt);
			_interface._excute(_interface.setPopup, opt);
		},
		close: function(opt) {
			this.stop().fadeOut(opt.time);
			_config.plugin.tint.stop().fadeOut(opt.time);
		}
	}

	// jQuery controller layer.
	$.fn.pignosePopup = function(options) {
		var ERROR_FLAG = 0x01;

		if(typeof _interface[options] === 'function') {
			return _interface[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof options === 'object' || !options) {
			return _interface.init.apply(this, arguments);
		}
		else {
			// Throws error exception.
			_interface._throw('an error has occurred in initialization.', 0);
			return ERROR_FLAG;
		}
	};
})(jQuery);