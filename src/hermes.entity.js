;(function hermesEntity (global) {
  define(['lib/underscore', 'lib/shifty', 'src/hermes.core'], function () {
    var defaultState
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
    };
    
    
    /**
     * @private
     */
    Hermes.prototype._tick_entitiy = function () {
      
    };


    /**
     * Entity constructor.  Defines the base class for any game object that is
     * used in a Hermes game.
     * @param {Object} config An Object of properties that can be attached to
     *    a new Entity.  This overrides any predefined defaults.
     * @param {Hermes} hermes The Hermes instance to which this Entity is
     *    associated with.
     * @returns {Entity}
     */
    function Entity (config, hermes) {
      _.extend(this, config);
      _.defaults(this, defaultState);
      this.hermes = hermes;
      
      if (!this.id) {
        this.id = getUniqueId();
      }
      
      this.hermes.addEntity(this);
      
      return this;
    }


    // Entities have the capabilites of a Shifty `Tweenable` Object.
    Entity.prototype = new Tweenable();


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
     *    a new Entity.  This overrides any predefined defaults.
     * @returns {Entity}
     */
    Hermes.prototype.createNewEntity = function (config) {
      var newEntity;
      
      newEntity = new Entity(config, this);

      return newEntity;
    };


    // Expose Entity publicly.
    Hermes.util.Entity = Entity;
    
  });
} (this));
