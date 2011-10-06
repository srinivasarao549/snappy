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
      this.keysdown = {};

      function keydownHandler (ev) {
        self.keysdown[ev.which] = true;
      };

      function keyupHandler (ev) {
        delete self.keysdown[ev.which];
      };

      document.body.addEventListener('keydown', keydownHandler, false);
      document.body.addEventListener('keyup', keyupHandler, false);
    }

    Hermes.prototype.keyhandlerAdd = function keyhandlerAdd (key, handler) {

      function eventHandler (ev) {
        if (ev.keyCode === key) {
          (handler || Hermes.util.noop)();
        }
      };

      eventHandler.name = 'eventHandler';
      document.body.addEventListener('keypressed', eventHandler, false);
    };

    Hermes.prototype.keyhandlerRemove = function keyhandlerRemove (key, handler) {

    };
  });
} (this));
