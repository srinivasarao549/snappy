/**
 * Requires:
 *  hermes.core.js
 */
;(function (global) {
  
  var gh
      ,keyMap;
  
  gh = global.Hermes;
  
  gh.prototype.keys = {
    'UP': 38
    ,'DOWN': 40
    ,'LEFT': 37
    ,'RIGHT': 39
  };
  
  gh.prototype.keyhandlerAdd = function keyhandlerAdd (key, handler) {
    
    eventHandler = function (ev) {
      if (ev.keyCode === key) {
        (handler || gh.util.noop)();
      }
    };
    
    eventHandler.name = 'eventHandler';
    document.body.addEventListener('keydown', eventHandler, false);
  };
  
  gh.prototype.keyhandlerRemove = function keyhandlerRemove (key, handler) {
    
  };
  
} (this));