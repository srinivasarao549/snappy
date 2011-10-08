define(['src/hermes.key'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'keyTest': function (hermesInst) {
      hermesInst.key_init();

      hermesInst.key_bindHold(hermesInst.keys.UP, function () {
        console.log('up is held');
      });

    	hermesInst.key_bindPress(hermesInst.keys.DOWN, function () {
    		console.log('down is pressed');
    	});

    	var testBind = function () {
    		console.log('left is pressed');
    	};

    	hermesInst.key_bindPress(hermesInst.keys.LEFT, testBind);
    	hermesInst.key_unbindPress(hermesInst.keys.LEFT, testBind);

      console.log(hermesInst);
    }
  })
});