define(['src/snappy.canvas'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'canvasTest': function (snappy) {
      snappy.canvas_init();
    }
  })
});