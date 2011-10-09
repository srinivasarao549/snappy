define(['src/hermes.entity'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'entityTest': function (hermes) {
      var entity;
      
      entity = hermes.createNewEntity();
      console.log(entity);
    }
  })
});