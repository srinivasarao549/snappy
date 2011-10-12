;(function hermesEntity (global) {
  define(['lib/underscore', 'lib/shifty', 'src/hermes.core'], function () {
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
      ,'velocity': 90
    };


    defaultConfig = {
      
    };
    
    
    /**
     * @private
     */
    Hermes.prototype._tick_entitiy = function () {
      
    };


    /**
     * Entity constructor.  Defines the base class for any game object that is
     * used in a Hermes game.
     * @param {Hermes} hermes The Hermes instance to which this Entity is
     *    associated with.
     * @param {Object} opt_config An Object of properties that can be attached
     *    to a new Entity.  This overrides any predefined defaults.
     * @param {Object} opt_state An Object of properties to set as the default 
     *    `Tweenable` `initialState` parameter.
     * @returns {Entity}
     */
    function Entity (hermes, opt_config, opt_state) {
      opt_config = opt_config || {};
      opt_state = opt_state || {};

      this.constructor.call(this, {
        'initialState': _.defaults(opt_state, defaultState)
      });

      this.hermes = hermes;
      _.extend(this, opt_config);
      this.fps = hermes.config.fps;

      if (!this.id) {
        this.id = getUniqueId();
      }

      this.hermes.addEntity(this);

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


    /**
     * Remove this Entity from the Hermes Object that it is associated with.
     */
    Entity.prototype.destroy = function () {
      // Destroy me!
      this.hermes.removeEntity(this);
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
    Hermes.prototype.createNewEntity = function (config, state) {
      var newEntity;

      newEntity = new Entity(this, config, state);

      return newEntity;
    };


    // Expose Entity publicly.
    Hermes.util.Entity = Entity;
    
  });
} (this));
