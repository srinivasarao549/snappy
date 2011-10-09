define(['src/hermes.canvas'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'canvasTest': function (hermes) {
      hermes.canvas_init();
    }
  })
});