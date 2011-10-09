;(function hermesCore (global) {
  define(['lib/underscore'], function () {
    var gh
        ,defaultConfig;


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
    
    
    defaultConfig = {
      'height': 200
      ,'width': 300
      ,'color': '#ddd'
      ,'fps': 30
    };


    /**
     * Constructor.  Creates a Hermes instance.
     * @param {HTMLCanvasElement} canvas
     * @param {Object} opt_config
     * @returns {Hermes}
     */
    gh = global.Hermes = global.Hermes || function Hermes (canvas, opt_config) {
      var self;

      self = this;
      this.canvas = canvas;
      this.config = _.defaults(opt_config || {}, defaultConfig);
      this.state = {};
      this._tickSteps = [];
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
