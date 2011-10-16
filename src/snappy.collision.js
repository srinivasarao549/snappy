;(function snappyCollision (global) {
  define(['lib/underscore'], function () {
    
    
    function areRectsColliding (rect1, rect2) {
      var rect1Left
          ,rect1Right
          ,rect1Top
          ,rect1Bottom
          ,rect2Left
          ,rect2Right
          ,rect2Top
          ,rect2Bottom;
          
          rect1Left = rect1.x;
          rect1Right = rect1Left + rect1.width;
          rect1Top = rect1.y;
          rect1Bottom = rect1Top + rect1.height;
          
          rect2Left = rect2.x;
          rect2Right = rect2Left + rect2.width;
          rect2Top = rect2.y;
          rect2Bottom = rect2Top + rect2.height;

      if (rect1Right > rect2Left
          && rect1Left < rect2Right
          && rect1Bottom > rect2Top
          && rect1Top < rect2Bottom) {
        return true;
      }
      
      return false;
    }

  });
} (this));
