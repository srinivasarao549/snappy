;(function snappyPlayer (global) {
  define(['lib/underscore', 'src/snappy.entity'], function () {

    function bindMovementKeys (snappy, entity) {
      _.each({ 'UP': -1, 'DOWN': 1,
              'LEFT': -1, 'RIGHT': 1 }
        ,function (velocity, direction) {
        
        var axis;

        if (direction === 'UP'
            || direction === 'DOWN') {
          axis = 'y';
        } else {
          axis = 'x';
        }

        snappy.key_bindPress(snappy.keys[direction], function pressHandler () {
          entity.applyForce(axis, velocity);
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
