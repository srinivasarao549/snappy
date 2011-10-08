define(['src/hermes.canvas'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'canvasTest': function (hermesInst) {
      hermesInst.canvas_init();
    }
  })
});