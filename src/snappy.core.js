;(function snappyCore (global) {
  define(['lib/underscore'], function () {
    var gs
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
     * Constructor.  Creates a Snappy instance.
     * @param {HTMLCanvasElement} canvas
     * @param {Object} opt_config
     * @returns {Snappy}
     */
    gs = global.Snappy = global.Snappy || function Snappy (canvas, opt_config) {
      var self;

      self = this;
      this.canvas = canvas;
      this.config = _.defaults(opt_config || {}, defaultConfig);
      this.entities = {};
      this.players = {};
      this.state = {};
      this._tickSteps = [];
      this._tick();
      this._previousTimestamp = now();

      return this;
    };


    /**
     * @private
     * Executes all logic for the current frame.
     */
    gs.prototype._tick = function () {
      var self
          ,i
          ,currentTime;

      self = this;
      currentTime = now();

      for (i = 0; i < this._tickSteps.length; i++) {
        this._tickSteps[i].handler.call(this, currentTime); 
      }

      _.each(this.entities, function (entity) {
        entity.tick(currentTime, currentTime - this_previousTimestamp);
      }, this);
      
      _.each(this.entities, function (entity) {
        entity.draw();
      }, this);

      this_previousTimestamp = currentTime;

      setTimeout(function () {
        self._tick();
      }, 1000 / this.config.fps);
    };


    /**
     * Adds an Entity to the internal store of Entity Objects.
     * @param {Entity} entity The Entity to add.
     */
    gs.prototype.addEntity = function (entity) {
      if (this.entities.hasOwnProperty(entity.id)) {
        throw 'Entity id "' + entity.id + '" already exists.';
      }
      
      this.entities[entity.id] = entity;
    };


    /**
     * Removes an Entity from the internal store of Entity Objects.
     */
    gs.prototype.removeEntity = function (entity) {
      delete this.entities[entity.id];
    };


    // Expose some useful utilities globally.
    gs.util = {
      'noop': noop
      ,'now': now
    };

    return gs;
  });
} (this));
