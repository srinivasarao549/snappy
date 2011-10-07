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
      this.tickSteps = [];

      this.config = {
        'fps': 30
      };

      this.tick();

      return this;
    };

    gh.prototype.tick = function () {
      var self
          ,i;

      self = this;

      for (i = 0; i < this.tickSteps.length; i++) {
        this.tickSteps[i].handler.call(this); 
      }

      setTimeout(function () {
        self.tick();
      }, 1000 / this.config.fps);
    };

    gh.util = {};

    _.extend(gh.util, {
      'noop': noop
    });

    return gh;
  });
} (this));
