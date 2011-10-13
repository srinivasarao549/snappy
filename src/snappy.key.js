;(function snappykey (global) {
  define(['lib/underscore', 'src/snappy.core'], function () {
    var keyMap;

    
    /**
     * @private
     * @param {Snappy} snappy The instance to invoke the keydown handlers
     *    upon.
     * @param {number|string} forKey The keycode representing the key to 
     *    invoke the handlers for.
     */
    function invokeKeydownHandlers (snappy, forKey) {
      var i
          ,len
          ,handlerList;
          
      handlerList = snappy.key_pressHandlers[forKey];
      
      if ((handlerList)
          && (handlerList.length > 0)
          && (handlerList.canPressAgain === true)) {
            
        len = handlerList.length;

        for (i = 0; i < len; i++) {
          handlerList[i].call(snappy);
        }
        
        handlerList.canPressAgain = false;
      }
    }


    /**
     * Generic event handler for the `window`'s keydown event.
     * @param {Snappy} snappy
     * @param {KeyboardEvent} ev
     */
    function keydownHandler (snappy, ev) {
      snappy.key_keysdown[ev.which] = true;
    };


    /**
     * Generic event handler for the `window`'s keyup event.
     * @param {Snappy} snappy
     * @param {KeyboardEvent} ev
     */
    function keyupHandler (snappy, ev) {
      delete snappy.key_keysdown[ev.which];
      
      _.each(snappy.key_pressHandlers, function (handlerList) {
        handlerList.canPressAgain = true;
      });

      _.each(snappy.key_releaseHandlers[ev.which], function (handler) {
        handler.call(snappy);
      });
    };


    function windowBlurHandler (snappy, ev) {
      _.each(snappy.key_keysdown, function (isDown, which) {
        _.each(snappy.key_releaseHandlers[which], function (handler) {
          handler.call(snappy);
        });
        
        delete snappy.key_keysdown[which]
      });
    }


    /**
     * Utility list that contains keycodes.
     */
    Snappy.prototype.keys = {
      'UP': 38
      ,'DOWN': 40
      ,'LEFT': 37
      ,'RIGHT': 39
    };

    
    /**
     * @private
     * Is called for every frame update to execute the handlers for all
     * pressed and held keys.
     */
    Snappy.prototype._tick_key = function () {
      _.each(this.key_keysdown, function (val, key) {
        (this.key_holdHandlers[key] || Snappy.util.noop).call(this);
        invokeKeydownHandlers(this, key);
      }, this);
    };


    /**
     * Sets up the key module for a Snappy instance.
     */
    Snappy.prototype.key_init = function () {
      var self;

      self = this;
      this.key_keysdown = {};
      this.key_holdHandlers = {};
      this.key_pressHandlers = {};
      this.key_releaseHandlers = {};

      document.documentElement.addEventListener('keydown', function (ev) {
        keydownHandler(self, ev);
      }, false);
      
      document.documentElement.addEventListener('keyup', function (ev) {
        keyupHandler(self, ev);
      }, false);

      window.addEventListener('blur', function (ev) {
        windowBlurHandler(self, ev);
      }, false);

      this._tickSteps.push({
        'name': 'key'
        ,'handler': this._tick_key
      });
    };


    /**
     * Binds a handler to to be invoked when a key is held.  "Hold" 
     * handlers are invoked on every tick, as long as the key is held down by
     * the user.
     * @param {number|string} key The keycode representing the key to bind
     *    `handler` to.
     * @param {Function} handler The event handler function to be invoked.
     */
    Snappy.prototype.key_bindHold = function (key, handler) {
      // TODO(jeremyckahn): Implement multiple handlers per key hold, as done 
      // with keypress.
      this.key_holdHandlers[key] = handler;
    };


    /**
     * Detaches a handler from the "held" event for a given key.
     * @param {number|string} key The keycode representing the key to unbind
     *    `handler` from.
     */
    Snappy.prototype.key_unbindHold = function (key) {
      delete this.key_holdHandlers[key];
    };


    /**
     * Binds an handler to be invoked when a key is pressed.  "Pressed" handlers
     * are invoked when a key is pressed by the user, and not invoked again
     * until the key is released by the user.
     * @param {number|string} key The keycode representing the key to bind
     *    `handler` to.
     * @param {Function} handler The event handler function to be invoked.
     */
    Snappy.prototype.key_bindPress = function (key, handler) {
      if (!this.key_pressHandlers[key]) {
        this.key_pressHandlers[key] = [];
        this.key_pressHandlers[key].canPressAgain = true;
      }

      this.key_pressHandlers[key].push(handler);
    };


    /**
     * Removes a handler from list of handlers to be invoked for a "pressed"
     * key.
     * @param {number|string} key The keycode representing the key to unbind
     *    `handler` from.
     * @param {Function} opt_handler The function to be removed.  If omitted,
     *    all bound handlers for `key` are removed.
     */
    Snappy.prototype.key_unbindPress = function (key, opt_handler) {
      if (this.key_pressHandlers[key]) {
        if (opt_handler) {
          this.key_pressHandlers[key] = _.without(
              this.key_pressHandlers[key], opt_handler);
        } else {
          this.key_pressHandlers[key].length = 0;
        }
      }
    };


    /**
     * Binds an handler to be invoked when a key is released.
     * @param {number|string} key The keycode representing the key to bind
     *    `handler` to.
     * @param {Function} handler The event handler function to be invoked.
     */
    Snappy.prototype.key_bindRelease = function (key, handler) {
      if (!this.key_releaseHandlers[key]) {
        this.key_releaseHandlers[key] = [];
      }

      this.key_releaseHandlers[key].push(handler);      
    };


    /**
     * Removes a handler from list of handlers to be invoked for a "released"
     * key.
     * @param {number|string} key The keycode representing the key to unbind
     *    `handler` from.
     * @param {Function} opt_handler The function to be removed.  If omitted,
     *    all bound handlers for `key` are removed.
     */
    Snappy.prototype.key_unbindRelease = function (key, opt_handler) {
      if (this.key_releaseHandlers[key]) {
        if (opt_handler) {
          this.key_releaseHandlers[key] = _.without(
              this.key_releaseHandlers[key], opt_handler);
        } else {
          this.key_releaseHandlers[key].length = 0;
        }
      }
    };
  });
} (this));
