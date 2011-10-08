define(['src/hermes.key'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'keyTest': function (hermesInst) {
      hermesInst.key_init();

      hermesInst.bindKeyHold(hermesInst.keys.UP, function () {
        console.log('up is held');
      });

    	hermesInst.bindKeyPress(hermesInst.keys.DOWN, function () {
    		console.log('down is pressed');
    	});

    	var testBind = function () {
    		console.log('left is pressed');
    	};

    	hermesInst.bindKeyPress(hermesInst.keys.LEFT, testBind);
    	hermesInst.unbindKeyPress(hermesInst.keys.LEFT, testBind);

      console.log(hermesInst);
    }
  })
});