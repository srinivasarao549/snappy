/**
 * Requires:
 *
 */

;(function hermesCore (global) {
  define(['lib/underscore'], function () {
    var gh;


    /**
     * It's a no-op.
     */
    function noop () {
      // Does nothing.
    }


    /**
     * Gets the current UNIX epoch time.
     * @returns {number}
     */
    function now () {
      return +(new Date());
    }


    /**
     * Constructor.  Creates a Hermes instance.
     * @param {HTMLCanvasElement} canvas
     * @returns {Hermes}
     */
    gh = global.Hermes = global.Hermes || function Hermes (canvas) {

      var self;

      self = this;
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this._tickSteps = [];

      this.config = {
        'fps': 30
      };

      this._tick();

      return this;
    };


    /**
     * @private
     * Executes all logic for the current frame.
     */
    gh.prototype._tick = function () {
      var self
          ,i
          ,currentTime;

      self = this;
      currentTime = now();

      for (i = 0; i < this._tickSteps.length; i++) {
        this._tickSteps[i].handler.call(this, currentTime); 
      }

      setTimeout(function () {
        self._tick();
      }, 1000 / this.config.fps);
    };


    // Expose some useful utilities globally.
    gh.util = {
      'noop': noop
      ,'now': now
    };


    return gh;
  });
} (this));
