/**
 * Requires:
 *  hermes.core.js
 */

;(function hermesCanvas (global) {
  define(['src/hermes.core'], function () {
    
    function Entity (config) {
      
    }
    
    Hermes.prototype.createNewEntity = function (config) {
      return new Entity(config);
    }
  });
}(this))