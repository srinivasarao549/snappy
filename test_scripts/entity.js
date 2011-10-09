define(['src/hermes.entity'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'entityTest': function (hermesInst) {
      var entity;
      
      entity = hermesInst.createNewEntity();
      console.log(entity);
    }
  })
});