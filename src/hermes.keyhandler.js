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
      this.keyhandlerHeldHandlers = {};

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

      // Init can only run once<F9><F8>
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

    Hermes.prototype.keyhandlerRemove = function keyhandlerRemove (key, handler) {

    };*/

    Hermes.prototype.bindHeldKey = function (key, handler) {
      this.keyhandlerHeldHandlers[key] = handler;
    };

    Hermes.prototype.unbindHeldKey = function (key, handler) {
      delete this.keyhandlerHeldHandlers[key];
    };

    Hermes.prototype.keyhandlerTick = function () {
      _.each(this.keyhandlerKeysdown, function (val, key) {
        (this.keyhandlerHeldHandlers[key] || Hermes.util.noop)();
      }, this);
    };
  });
} (this));
