/*********************************************************
*
*  - PIGNOSE Popup JS
*  - AUTHOR  PIGNOSE (https://www.github.com/KennethanCeyer)
*  - LICENCE MIT
*
********************************************************/

(function($) {
	// Plugin common configuration.
	var _config = {
		id:         'pignose-popup',
		name:       'PIGNOSE Popup',
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
				animate:   true,
				theme: '',
				btn_close: '.btn_close',
				escape:    true,
				time:      300,
				tint:      '#000000',
				opacity:   0.6,
				scroll:    false,
				zIndex:    500,
			}, options), _this = this;

			_this.addClass(_config.id);
			if(typeof opt.theme != '') {
				_this.addClass(opt.theme);
			}
			_config.plugin.item = _this;
			_interface._excute(_interface.open, opt);
			
			return _this;
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
				position:        'fixed',
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
			
			if(opt.escape === true) {
				_interface._bind($pignose_tint, 'click', function() {
					_interface._excute(_interface.close, opt);
				});
			}

			$pignose_tint.appendTo('body');
			_config.plugin.tint = $pignose_tint;

			if(opt.animate === true) {
				$pignose_tint.stop().fadeIn(opt.time);
			}
			else {
				$pignose_tint.show();
			}
		},
		setPopup: function(opt) {
			var $window = $(window);
			var $this   = this.each(function() {
				var $this = $(this);
				$this.css({
					position: 'absolute',
					zIndex:   opt.zIndex + 1
				});
				
				if(opt.animate === true) {
					$this.stop().fadeIn(opt.time);
				}
				else {
					$this.show();
				}
				
			});
			_interface._bind($window, 'resize', function() {
				$this.each(function() {
					var $this = $(this);
					$this.css({
						left: ($window.width()  - $this.outerWidth(true))  / 2,
						top:  ($window.height() - $this.outerHeight(true)) / 2 + $window.scrollTop(),
						left: ($window.width()  - $this.outerWidth(true))  / 2 + $window.scrollLeft()
					});
				});
			}, true);
			if(opt.scroll === true) {
				_interface._bind($window, 'scroll', function() {
					$this.css({
						top:  ($window.height() - $this.outerHeight(true)) / 2 + $window.scrollTop(),
						left: ($window.width()  - $this.outerWidth(true))  / 2 + $window.scrollLeft()
					});
				});
			}
			_interface._bind($this, 'close', function() {
				_interface._excute(_interface.close, opt);
			});
			_interface._bind($this, 'click', function(event) {
				event.stopPropagation();
			});
			_interface._bind($this.find(opt.btn_close), 'click', function(event) {
				_interface._excute(_interface.close, opt);
				event.preventDefault();
			});
		},
		open: function(opt) {
			_interface._excute(_interface.setTint, opt);
			_interface._excute(_interface.setPopup, opt);
		},
		close: function(opt) {
			if(opt.animate === true) {
				this.stop().fadeOut(opt.time);
				_config.plugin.tint.stop().fadeOut(opt.time);
			}
			else {
				this.hide();
				_config.plugin.tint.hide();
			}
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
}) (jQuery);