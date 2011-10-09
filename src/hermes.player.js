;(function hermesPlayer (global) {
  define(['lib/underscore', 'src/hermes.entity'], function () {

    function Player (config, hermes) {
      // Steal `Entity`'s constructor.
      Hermes.util.Entity.call(this, config, hermes);
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
