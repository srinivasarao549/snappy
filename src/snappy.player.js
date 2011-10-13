;(function snappyPlayer (global) {
  define(['lib/underscore', 'src/snappy.entity'], function () {

    // OH MY GOD WHAT THE FUCK HAPPENED HERE
    /*function bindMovementKeys (snappy, entity) {
      _.each({ 'UP': -entity.velocity, 'DOWN': entity.velocity,
        'LEFT': -entity.velocity, 'RIGHT': entity.velocity}
        ,function (velocity, direction) {

        var to
            ,step;

        if (direction === 'UP'
            || direction === 'DOWN') {
          to = { 'y': entity.y + velocity };
          step = function () {
            entity.y = this.y;
          };
        } else {
          to = { 'x': entity.x + velocity };
          step = function () {
            entity.x = this.x;
          };
        }

        snappy.key_bindPress(snappy.keys[direction], function pressHandler () {
          
          entity.to({
            'to': to
            ,'duration': 1000
            ,'easing': 'linear'
            ,'step': step
            ,'callback': function () {
              if (direction === 'UP'
                  || direction === 'DOWN') {
                to = { 'y': this.y + velocity };
              } else {
                to = { 'x': this.x + velocity };
              }   
   
              pressHandler();
            }
          });
      	});

      	snappy.key_bindRelease(snappy.keys[direction], function () {
          entity.stop();
      	});
      });
    }*/
    
    function bindMovementKeys (snappy, entity) {
      _.each({ 'UP': -entity.velocity, 'DOWN': entity.velocity,
        'LEFT': -entity.velocity, 'RIGHT': entity.velocity}
        ,function (velocity, direction) {

        //var to
        //    ,step;
        //
        //if (direction === 'UP'
        //    || direction === 'DOWN') {
        //  to = { 'y': entity.y + velocity };
        //} else {
        //  to = { 'x': entity.x + velocity };
        //}

        snappy.key_bindPress(snappy.keys[direction], function pressHandler () {

      	});

      	snappy.key_bindRelease(snappy.keys[direction], function () {

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
