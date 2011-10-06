/**
 * Requires:
 *  hermes.core.js
 */
;(function (global) {

  var gh
      ,keyMap;

  /*function addIfUnique (arr, val) {
    var hasValue
        ,i;

    hasValue = false;

    for (i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        hasValue = true;
      }
    }

    if (hasValue) {
      arr.push(value);
      return true;
    }

    return false;
  }

  function removeFirstInstanceOf (arr, val) {
    var i;

    for (i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1);
        break;
      }
    }

    return;
  }*/

  gh = global.Hermes;

  gh.prototype.keys = {
    'UP': 38
    ,'DOWN': 40
    ,'LEFT': 37
    ,'RIGHT': 39
  };

  gh.prototype.keyhandlerInit = function keyhandlerInit () {
    var self;

    self = this;
    this.keysdown = {};

    function keydownHandler (ev) {
      //addIfUnique(self.keysdown, ev.which);
      self.keysdown[ev.which] = true;

    };

    function keyupHandler (ev) {
      //removeFirstInstanceOf(self.keysdown, ev.which);
      delete self.keysdown[ev.which];
      console.log(self.keysdown+'');
    };

    document.body.addEventListener('keydown', keydownHandler, false);
    document.body.addEventListener('keyup', keyupHandler, false);
  }

  gh.prototype.keyhandlerAdd = function keyhandlerAdd (key, handler) {

    function eventHandler (ev) {
      if (ev.keyCode === key) {
        (handler || gh.util.noop)();
      }
    };

    eventHandler.name = 'eventHandler';
    document.body.addEventListener('keypressed', eventHandler, false);
  };

  gh.prototype.keyhandlerRemove = function keyhandlerRemove (key, handler) {

  };

} (this));
