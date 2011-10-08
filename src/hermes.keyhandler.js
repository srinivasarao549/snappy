/**
 * Requires:
 *  hermes.core.js
 */

;(function (global) {
  define(['src/hermes.core', 'lib/underscore'], function (Hermes) {
    var keyMap;

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

    /*Hermes.prototype.keyhandlerAdd = function keyhandlerAdd (key, handler) {

      function eventHandler (ev) {
        if (ev.keyCode === key) {
          (handler || Hermes.util.noop)();
        }
      };

      eventHandler.name = 'eventHandler';
      document.body.addEventListener('keypressed', eventHandler, false);
    };

    Hermes.prototype.keyhandlerRemove = function keyhandlerRemove (key, 
          handler) {

    };*/

    Hermes.prototype.bindKeyHold = function (key, handler) {
      this.keyhandlerHoldHandlers[key] = handler;
    };

    Hermes.prototype.unbindKeyHold = function (key, handler) {
      delete this.keyhandlerHoldHandlers[key];
    };

    Hermes.prototype.bindKeyPress = function (key, handler) {
      if (!this.keyhandlerPressHandlers[key]) {
        this.keyhandlerPressHandlers[key] = [];
      }

      this.keyhandlerPressHandlers[key].push(handler);
    }

    Hermes.prototype.unbindKeyPress = function (key, handler) {

    }
    
    function invokeKeydownHandlers (hermesInst, forKey) {
      var i, len;
      
      if (hermesInst.keyhandlerPressHandlers[forKey] 
          && hermesInst.keyhandlerPressHandlers[forKey].length > 0) {
        len = hermesInst.keyhandlerPressHandlers[forKey].length;

        for (i = 0; i < len; i++) {
          hermesInst.keyhandlerPressHandlers[forKey][i].call(hermesInst);
        }
      }
    }

    Hermes.prototype.keyhandlerTick = function () {
      _.each(this.keyhandlerKeysdown, function (val, key) {
        (this.keyhandlerHoldHandlers[key] || Hermes.util.noop).call(this);
        invokeKeydownHandlers(this, key);
      }, this);
    };
  });
} (this));
