// This file is not presently being used.  It can probably be deleted.

;(function (global) {
  define(['src/snappy.entity'], function () {

    if (!window.testModule) {
      window.testModule = {};
    }

    _.extend(window.testModule, {
      'entityTest': function (snappy) {
        var entity;

        entity = snappy.createNewEntity();
        global.entity = entity;
      }
    })
  });
} (this));