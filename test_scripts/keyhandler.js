define(['src/snappy.key'], function () {
  
  if (!window.testModule) {
    window.testModule = {};
  }
  
  _.extend(window.testModule, {
    'keyTest': function (snappy) {
      snappy.key_init();

      //snappy.key_bindHold(snappy.keys.UP, function () {
      //  console.log('up is held');
      //});

    	//snappy.key_bindPress(snappy.keys.DOWN, function () {
    	//	console.log('down is pressed');
    	//});

    	var testBind = function () {
    		console.log('left is pressed');
    	};

    	snappy.key_bindPress(snappy.keys.LEFT, testBind);
    	snappy.key_unbindPress(snappy.keys.LEFT, testBind);

      console.log(snappy);
    }
  })
});