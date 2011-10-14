;(function snappyPlayer (global) {
  define(['lib/underscore', 'src/snappy.entity'], function () {
    
    var CONTROL_FORCE = 50;

    function bindMovementKeys (snappy, entity) {
      _.each({ 'UP': -CONTROL_FORCE, 'DOWN': CONTROL_FORCE,
              'LEFT': -CONTROL_FORCE, 'RIGHT': CONTROL_FORCE }
        ,function (velocity, direction) {
        
        var axis;

        if (direction === 'UP'
            || direction === 'DOWN') {
          axis = 'y';
        } else {
          axis = 'x';
        }

        snappy.key_bindPress(snappy.keys[direction], function pressHandler () {
          entity.setForce(axis, velocity);
      	});

      	snappy.key_bindRelease(snappy.keys[direction], function () {
          entity.resetForce(axis);
      	});
      });
    }

    function Player (snappy, config, state) {
      // Steal `Entity`'s constructor.
      Snappy.util.Entity.call(this, snappy, config, state);
      bindMovementKeys(snappy, this);
      
      return this;
    }


    // Share `Entity`'s prototype.
    Player.prototype = Snappy.util.Entity.prototype;


    /**
     * Set up a new Player.  This also registers the Player instance with
     *    Snappy.
     */
    Snappy.prototype.player_init = function (config, state) {
      return new Player(this, config, state);
    };


  });
} (this));
