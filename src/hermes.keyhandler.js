/**
 * Requires:
 *  hermes.core.js
 */

;(function hermesKeyhandler (global) {
  define(['src/hermes.core', 'lib/underscore'], function (Hermes) {
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
          
      handlerList = hermesInst.keyhandler_pressHandlers[forKey];
      
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
    Hermes.prototype._keyhandler_tick = function () {
      _.each(this.keyhandler_keysdown, function (val, key) {
        (this.keyhandler_holdHandlers[key] || Hermes.util.noop).call(this);
        invokeKeydownHandlers(this, key);
      }, this);
    };


    /**
     * Sets up the keyhandler module for a Hermes instance.
     */
    Hermes.prototype.keyhandler_init = function keyhandler_init () {
      var self;

      self = this;
      this.keyhandler_keysdown = {};
      this.keyhandler_holdHandlers = {};
      this.keyhandler_pressHandlers = {};

      function keydownHandler (ev) {
        self.keyhandler_keysdown[ev.which] = true;
      };

      function keyupHandler (ev) {
        delete self.keyhandler_keysdown[ev.which];
        
        _.each(self.keyhandler_pressHandlers, function (val, key) {
          self.keyhandler_pressHandlers[key].canPressAgain = true;
        });
      };

      // TODO(jeremyckahn): These never get unbound, there needs to be a way to
      // do that.
      document.body.addEventListener('keydown', keydownHandler, false);
      document.body.addEventListener('keyup', keyupHandler, false);

      this._tickSteps.push({
        'name': 'keyhandler'
        ,'handler': this._keyhandler_tick
      });
    }


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
      this.keyhandler_holdHandlers[key] = handler;
    };


    /**
     * Detaches a handler from the "held" event for a given key.
     * @param {number|string} key The keycode representing the key to unbind
     *    `handler` from.
     */
    Hermes.prototype.unbindKeyHold = function (key) {
      delete this.keyhandler_holdHandlers[key];
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
      if (!this.keyhandler_pressHandlers[key]) {
        this.keyhandler_pressHandlers[key] = [];
        this.keyhandler_pressHandlers[key].canPressAgain = true;
      }

      this.keyhandler_pressHandlers[key].push(handler);
    }


    /**
     * Removes a handler from list of handlers to be invoked for a "pressed"
     * key.
     * @param {number|string} key The keycode representing the key to unbind
     *    `handler` from.
     * @param {Function} opt_handler The function to be removed.  If omitted,
     *    all bound handlers for `key` are removed.
     */
    Hermes.prototype.unbindKeyPress = function (key, opt_handler) {
      if (this.keyhandler_pressHandlers[key]) {
        if (opt_handler) {
          this.keyhandler_pressHandlers[key] = _.without(
              this.keyhandler_pressHandlers[key], opt_handler);
        } else {
          this.keyhandler_pressHandlers[key].length = 0;
        }
      }
    }


  });
} (this));
