;(function hermesCanvas (global) {
  define(['lib/underscore', 'src/hermes.core'], function () {
    
    /**
     * @private
     * Updates the height or width of an HTMLCanvas element.
     * @param {HTMLCanvas} canvas The canvas to update.
     * @param {string} name The name of the canvas dimension to update.
     * @param {number} size The amount to set `canvas[name]` to.
     */
    function setCanvasDimension (canvas, name, size) {
      canvas[name] = size;
      canvas.style[name] = size + 'px';
    }


    /**
     * @private
     * Is called for every frame update to do general canvas updates.
     * pressed and held keys.
     */
    Hermes.prototype._tick_canvas = function () {
      this.canvas_clear();
    };
    
    
    /**
     * Sets up an HTMLCanvas element to be used by Hermes.
     */
    Hermes.prototype.canvas_init = function () {
      this.canvas_context = this.canvas.getContext('2d');
      this.canvas_dimensions({
        'height': this.config.height
        ,'width': this.config.width
      });
      
      this.canvas_color(this.config.color);
      this._tickSteps.push({
        'name': 'canvas'
        ,'handler': this._tick_canvas
      });
    };


    /**
     * Gets or sets the height/width of the Hermes canvas.
     * @param {Object} opt_dimensions If supplied, the canvas' `height` and 
     *    `width` properties are set the this Object's corresponding properties.
     * @returns {Object} An Object containing the canvas' current 'height'
     *    and `width` properties.
     */
    Hermes.prototype.canvas_dimensions = function (opt_dimensions) {
      if (opt_dimensions) {
        _.each(['height', 'width'], function (dimensionName) {
          if (opt_dimensions.hasOwnProperty(dimensionName)) {
            setCanvasDimension(this.canvas, dimensionName, 
                opt_dimensions[dimensionName]);
                
            this.config[dimensionName] = opt_dimensions[dimensionName];
          }
        }, this);
      }
      
      return {
        'height': this.config.height
        ,'width': this.config.width
      };
    };


    /**
     * Gets or sets the color of the Hermes instance's canvas color.
     * @param {string} opt_newColor The color to set the canvas to.
     * @returns {string} The canvas' current background color.
     */
    Hermes.prototype.canvas_color = function (opt_newColor) {
      if (opt_newColor) {
        this.canvas.style.backgroundColor = opt_newColor;
      }
      
      return this.canvas.style.backgroundColor;
    };


    /**
     * Clears out the canvas and sets it back to its original color.
     */
    Hermes.prototype.canvas_clear = function () {
      var currentDimensions;
      
      currentDimensions = this.canvas_dimensions();
      this.canvas_context.clearRect(0, 0, currentDimensions.width, 
          currentDimensions.height);
    };
    
    
  });
} (this));
