/**
 * Requires:
 *
 */

;(function (global) {
  define(['lib/underscore'], function () {
    var gh;

    function noop () {
     // Does nothing.
    }

    /**
     * Constructor.
     * @param {HTMLCanvasElement} canvas
     */
    gh = global.Hermes = global.Hermes || function Hermes (canvas) {

      var self;

      self = this;
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      
      this.config = {
        'fps': 30
      };

      return this;
    };
    
    gh.prototype.gameLoop = function () {
      var self;
      
      self = this;
    };

    gh.util = {};

    _.extend(gh.util, {
      'noop': noop
    });

    return gh;
  });
} (this));
