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
  
  gh.prototype.keyhandlerInit = function keyhandlerInit () {
    var self;
    
    self = this;
    this.keysDown = [];
    
    function keydownHandler (ev) {
      
    };
    
    function keyupHandler (ev) {
      
    };
    
    document.body.addEventListener('keydown', eventHandler, false);
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