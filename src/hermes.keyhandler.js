/**
 * Requires:
 *  hermes.core.js
 */

;(function (global) {
  define(['src/hermes.core', 'lib/underscore'], function (Hermes) {
    var keyMap;

    function invokeKeydownHandlers (hermesInst, forKey) {
      var i, len;
      
      if (hermesInst.keyhandlerPressHandlers[forKey] 
          && hermesInst.keyhandlerPressHandlers[forKey].length > 0
          && hermesInst.keyhandlerPressHandlers[forKey].canPressAgain === true) {
            
        len = hermesInst.keyhandlerPressHandlers[forKey].length;

        for (i = 0; i < len; i++) {
          hermesInst.keyhandlerPressHandlers[forKey][i].call(hermesInst);
        }
        
        hermesInst.keyhandlerPressHandlers[forKey].canPressAgain = false;
      }
    }

    Hermes.prototype.keys = {
      'UP': 38
      ,'DOWN': 40
      ,'LEFT': 37
      ,'RIGHT': 39
    };

    Hermes.prototype.keyhandlerInit = function keyhandlerInit () {
      var self;

      self = this;
      this.keyhandlerKeysdown = {};
      this.keyhandlerHoldHandlers = {};
      this.keyhandlerPressHandlers = {};

      function keydownHandler (ev) {
        self.keyhandlerKeysdown[ev.which] = true;
      };

      function keyupHandler (ev) {
        delete self.keyhandlerKeysdown[ev.which];
        
        _.each(self.keyhandlerPressHandlers, function (val, key) {
          self.keyhandlerPressHandlers[key].canPressAgain = true;
        });
      };

      document.body.addEventListener('keydown', keydownHandler, false);
      document.body.addEventListener('keyup', keyupHandler, false);

      this.tickSteps.push({
        'name': 'keyhandler'
        ,'handler': this.keyhandlerTick
      });

      // Init can only run once
      this.keyHandlerInit = function () {};
    }

    Hermes.prototype.bindKeyHold = function (key, handler) {
      this.keyhandlerHoldHandlers[key] = handler;
    };

    Hermes.prototype.unbindKeyHold = function (key, handler) {
      delete this.keyhandlerHoldHandlers[key];
    };

    Hermes.prototype.bindKeyPress = function (key, handler) {
      if (!this.keyhandlerPressHandlers[key]) {
        this.keyhandlerPressHandlers[key] = [];
        this.keyhandlerPressHandlers[key].canPressAgain = true;
      }

      this.keyhandlerPressHandlers[key].push(handler);
    }

    Hermes.prototype.unbindKeyPress = function (key, handler) {

    }

    Hermes.prototype.keyhandlerTick = function () {
      _.each(this.keyhandlerKeysdown, function (val, key) {
        (this.keyhandlerHoldHandlers[key] || Hermes.util.noop).call(this);
        invokeKeydownHandlers(this, key);
      }, this);
    };
  });
} (this));
