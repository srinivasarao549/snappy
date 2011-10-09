;(function (global) {
  define(['src/hermes.player'], function () {

    if (!window.testModule) {
      window.testModule = {};
    }

    _.extend(window.testModule, {
      'playerTest': function (hermes) {
        hermes.player_init({
          //'isPlayer': true
        });
      }
    })
  });
} (this));