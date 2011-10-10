;(function (global) {
  define(['src/hermes.player'], function () {

    if (!window.testModule) {
      window.testModule = {};
    }

    _.extend(window.testModule, {
      'playerTest': function (hermes) {
        hermes.player_init({
          'draw': function () {
            var ctx = this.hermes.canvas_context;
            ctx.beginPath();

          	ctx.moveTo(this.x, this.y);
          	ctx.lineTo(this.x + this.width, this.y);
          	ctx.lineTo(this.x + this.width, this.y + this.height);
          	ctx.lineTo(this.x, this.y + this.height);

          	ctx.fillStyle = ctx.strokeStyle = this.color || '#f0f';
          	ctx.fill();
          	ctx.stroke();
          	ctx.closePath();
          }
        });
      }
    })
  });
} (this));