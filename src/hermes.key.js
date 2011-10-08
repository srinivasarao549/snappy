/**
 * Requires:
 *  hermes.core.js
 */

;(function hermeskey (global) {
  define(['src/hermes.core'], function (Hermes) {
    var keyMap;

    
    /**
     * @private
     * @param {Hermes} hermesInst The instance to invoke the keydown handlers
     *    upon.
     * @param {number|string} forKey The keycode representing the key to 
     *    invoke the handlers for.
     */
    function invokeKeydownHandlers (hermesInst, forKey) {
      var i
          ,len
          ,handlerList;
          
      handlerList = hermesInst.key_pressHandlers[forKey];
      
      if ((handlerList)
          && (handlerList.length > 0)
          && (handlerList.canPressAgain === true)) {
            
        len = handlerList.length;

        for (i = 0; i < len; i++) {
          handlerList[i].call(hermesInst);
        }
        
        handlerList.canPressAgain = false;
      }
    }


    /**
     * Utility list that contains keycodes.
     */
    Hermes.prototype.keys = {
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
    Hermes.prototype._tick_key = function () {
      _.each(this.key_keysdown, function (val, key) {
        (this.key_holdHandlers[key] || Hermes.util.noop).call(this);
        invokeKeydownHandlers(this, key);
      }, this);
    };


    /**
     * Sets up the key module for a Hermes instance.
     */
    Hermes.prototype.key_init = function () {
      var self;

      self = this;
      this.key_keysdown = {};
      this.key_holdHandlers = {};
      this.key_pressHandlers = {};

      function keydownHandler (ev) {
        self.key_keysdown[ev.which] = true;
      };

      function keyupHandler (ev) {
        delete self.key_keysdown[ev.which];
        
        _.each(self.key_pressHandlers, function (val, key) {
          self.key_pressHandlers[key].canPressAgain = true;
        });
      };

      // TODO(jeremyckahn): These never get unbound, there needs to be a way to
      // do that.
      document.body.addEventListener('keydown', keydownHandler, false);
      document.body.addEventListener('keyup', keyupHandler, false);

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
    Hermes.prototype.bindKeyHold = function (key, handler) {
      // TODO(jeremyckahn): Implement multiple handlers per key hold, as done 
      // with keypress.
      this.key_holdHandlers[key] = handler;
    };


    /**
     * Detaches a handler from the "held" event for a given key.
     * @param {number|string} key The keycode representing the key to unbind
     *    `handler` from.
     */
    Hermes.prototype.unbindKeyHold = function (key) {
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
    Hermes.prototype.bindKeyPress = function (key, handler) {
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
    Hermes.prototype.unbindKeyPress = function (key, opt_handler) {
      if (this.key_pressHandlers[key]) {
        if (opt_handler) {
          this.key_pressHandlers[key] = _.without(
              this.key_pressHandlers[key], opt_handler);
        } else {
          this.key_pressHandlers[key].length = 0;
        }
      }
    };


  });
} (this));
