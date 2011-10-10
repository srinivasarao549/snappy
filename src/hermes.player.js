;(function hermesPlayer (global) {
  define(['lib/underscore', 'src/hermes.entity'], function () {

    function bindMovementKeys (hermes, entity) {
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

        hermes.key_bindPress(hermes.keys[direction], function pressHandler () {
          
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

      	hermes.key_bindRelease(hermes.keys[direction], function () {
          entity.stop();
      	});
      });
    }

    function Player (config, hermes) {
      // Steal `Entity`'s constructor.
      Hermes.util.Entity.call(this, config, hermes);
      
      bindMovementKeys(hermes, this);
      
      return this;
    }


    // Share `Entity`'s prototype.
    Player.prototype = Hermes.util.Entity.prototype;


    /**
     * Set up a new Player.  This also registers the Player instance with
     *    Hermes.
     */
    Hermes.prototype.player_init = function (config) {
      return new Player(config, this);
    };


  });
} (this));
