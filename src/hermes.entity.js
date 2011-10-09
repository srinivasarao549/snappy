/**
 * Requires:
 *  hermes.core.js
 */

;(function hermesCanvas (global) {
  define(['src/hermes.core'], function () {
    var defaultState;
    
    defaultState = {
      'x': 0
      ,'y': 0
      ,'height': 50
      ,'width': 50
    };
    
    function Entity (config, hermes) {
      _.defaults(this, config);
      this.hermes = hermes;
    }
    
    Hermes.prototype.createNewEntity = function (config) {
      return new Entity(config, this);
    }
  });
}(this))