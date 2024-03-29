;(function snappyEntity (global) {
  define(['lib/underscore'
          ,'lib/shifty'
          ,'src/snappy.core'
          ,'src/snappy.collision'], function () {
    var defaultState
        ,defaultConfig
        ,idCounter;


    idCounter = 0;


    function getUniqueId () {
      return idCounter++;
    }


    // Defines some generic standard params for an Entity.
    defaultState = {
      'x': 0
      ,'y': 0
      ,'opacity': 1
      ,'height': 50
      ,'width': 50
      ,'velocityX': 0
      ,'velocityY': 0
      ,'forceX': 0
      ,'forceY': 0
    };


    defaultConfig = {
      'attributes': {
        'maxVelocity': 140
        ,'acceleration': 20
        ,'mass': 40
      }
    };


    /**
     * Entity constructor.  Defines the base class for any game object that is
     * used in a Snappy game.
     * @param {Snappy} snappy The Snappy instance to which this Entity is
     *    associated with.
     * @param {Object} opt_config An Object of properties that can be attached
     *    to a new Entity.  This overrides any predefined defaults.
     * @param {Object} opt_state An Object of properties to set as the default 
     *    `Tweenable` `initialState` parameter.
     * @returns {Entity}
     */
    function Entity (snappy, opt_config, opt_state) {
      opt_config = _.defaults(opt_config || {}, defaultConfig);
      opt_state = _.defaults(opt_state || {}, defaultState);

      this.constructor.call(this, {
        'initialState': opt_state
      });

      this.snappy = snappy;
      _.extend(this, opt_config);
      this.fps = snappy.config.fps;

      if (!this.id) {
        this.id = getUniqueId();
      }

      this.snappy.addEntity(this);

      return this;
    }


    // Entity shares Tweenable's prototype.
    Entity.prototype = Tweenable.prototype;


    /**
     * This method is a no-op; it's meant to be overridden by each instance.
     * `entity.draw` gets called each frame tick, and overriding versions
     * should follow the same method signature.
     */
    Entity.prototype.draw = function () {
      // To be overridden
    };


    Entity.prototype.tick = function (currentTime, timePassed) {
      // Velocity: v = d/t, or vt = d
      // Linear Acceleration: a = dv/dt, or dt*a = dv
      
      // Uniform acceleration: v = u + at
      // where u = initial velocity
      // a = uniform acceleration
      // t = time
      
      // http://gafferongames.com/game-physics/integration-basics/
      
      _.each({'forceX': 'x', 'forceY': 'y'}, function (axis, forceAxis) {
        var appliedVelocity
            ,previousVelocity
            ,state;

        state = this.get();
        appliedVelocity = this.get()[forceAxis] * this.attributes.maxVelocity; 
        state[axis] += appliedVelocity * (timePassed / 1000);
        
      }, this);
    };

    /**
     * Remove this Entity from the Snappy Object that it is associated with.
     */
    Entity.prototype.destroy = function () {
      // Destroy me!
      this.snappy.removeEntity(this);
    };


    /**
     * Set a "physical" force upon this Entity on a given axis.
     * @param {string} axis The direction in which to apply the force.  Should
     *    either "x" or "y".
     * @param {number} amount The amount of force to apply in `axis`.  Can be
     *    positive or negative.
     */
    Entity.prototype.setForce = function (axis, amount) {
      if (axis === 'x' || axis === 'y') {
        this.get()['force' + axis.toUpperCase()] = amount;
      }
    };


    /**
     * Reset the force that was applied with entity.setForce().
     * @param {string} axis The direction in which to reset the force.  Should
     *    either "x" or "y".
     */
    Entity.prototype.resetForce = function (axis) {
      if (axis === 'x' || axis === 'y') {
        this.get()['force' + axis.toUpperCase()] = 0;
      }
    };


    /**
     * Returns a new instance of Entity.
     * @param {Object} config An Object of properties that can be attached to 
     *    the new Entity.
     * @param {Object} state An Object of properties that can be attached to the
     *    new Entity's config object.
     *    a new Entity.  This overrides any predefined defaults.
     * @returns {Entity}
     */
    Snappy.prototype.createNewEntity = function (config, state) {
      var newEntity;

      newEntity = new Entity(this, config, state);

      return newEntity;
    };


    // Expose Entity publicly.
    Snappy.util.Entity = Entity;
    
  });
} (this));
