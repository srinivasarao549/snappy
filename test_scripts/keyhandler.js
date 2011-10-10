define(['src/hermes.key'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'keyTest': function (hermes) {
      hermes.key_init();

      //hermes.key_bindHold(hermes.keys.UP, function () {
      //  console.log('up is held');
      //});

    	//hermes.key_bindPress(hermes.keys.DOWN, function () {
    	//	console.log('down is pressed');
    	//});

    	var testBind = function () {
    		console.log('left is pressed');
    	};

    	hermes.key_bindPress(hermes.keys.LEFT, testBind);
    	hermes.key_unbindPress(hermes.keys.LEFT, testBind);

      console.log(hermes);
    }
  })
});