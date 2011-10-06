/**
 * Requires:
 *
 */

;(function (global) {
  define(['lib/underscore'], function () {
    var gh;

    /**
     * Handy shortcut for doing a for-in loop.  Takes care of all of the `hasOwnProperty` wizardry for you.
     * @param {Object} obj The object to iterate through.
     * @param {Function} func The function to pass the object and "own" property to.  This handler function receives the `obj` back as the first parameter, and a property name as the second.
     */
    function each (obj, func) {
      var prop;

      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          func(obj, prop);
        }
      }
    }

    /**
    * Does a basic copy of one Object's properties to another.  This is not a robust `extend` function, nor is it recusrsive.  It is only appropriate to use on objects that have primitive properties (Numbers, Strings, Boolean, etc.).
    * @param {Object} targetObject The object to copy into
    * @param {Object} srcObject The object to copy from
    * @returns {Object} A reference to the augmented `targetObj` Object
    */
    function simpleCopy (targetObj, srcObj) {
      each(srcObj, function (srcObj, prop) {
        targetObj[prop] = srcObj[prop];
      });

      return targetObj;
    }

    function noop () {
     // Does nothing.
    }

    /**
     * Constructor.
     * @param {HTMLCanvasElement} canvas
     */
    gh = global.Hermes = global.Hermes || function Hermes (canvas) {

      var self;

      self = this;
      this.canvas = canvas;
      this.context = canvas.getContext('2d');

      return this;
    };

    gh.util = {};

    simpleCopy(gh.util, {
      'noop': noop
      ,'simpleCopy': simpleCopy
      ,'each': each
    });

    return gh;
  });
} (this));
