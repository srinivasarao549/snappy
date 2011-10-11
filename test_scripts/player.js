;(function (global) {
  define(['src/hermes.player'], function () {

    if (!window.testModule) {
      window.testModule = {};
    }

    _.extend(window.testModule, {
      'playerTest': function (hermes) {
        hermes.player_init({
          'draw': function () {
            var ctx = this.hermes.canvas_context
                ,state = this.get();
            ctx.beginPath();

          	ctx.moveTo(state.x, state.y);
          	ctx.lineTo(state.x + state.width, state.y);
          	ctx.lineTo(state.x + state.width, state.y + state.height);
          	ctx.lineTo(state.x, state.y + state.height);

          	ctx.fillStyle = ctx.strokeStyle = state.color || '#f0f';
          	ctx.fill();
          	ctx.stroke();
          	ctx.closePath();
          }
        });
      }
    })
  });
} (this));