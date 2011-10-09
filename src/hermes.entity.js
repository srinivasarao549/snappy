;(function hermesCanvas (global) {
  define(['lib/underscore', 'lib/shifty', 'src/hermes.core'], function () {
    var defaultState;
    
    defaultState = {
      'x': 0
      ,'y': 0
      ,'opacity': 1
      ,'height': 50
      ,'width': 50
    };
    
    function Entity (config, hermes) {
      _.defaults(this, defaultState, config);
      this.hermes = hermes;
    }
    
    Entity.prototype.draw = function () {
      
    }
    
    Hermes.prototype.createNewEntity = function (config) {
      return new Entity(config, this);
    }
  });
}(this))