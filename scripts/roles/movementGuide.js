'use strict';

function MovementGuide(args) {
  if(!(this instanceof MovementGuide))
    return new MovementGuide(args);

  this.shape = args.shape;
  this.text = args.text;
  this.textX = args.textX;
  this.textY = args.textY;
  this.style = args.style;
  this.fontFamily = args.fontFamily;
  this.fontSize = args.fontSize;
  this.visible = true;
}

MovementGuide.prototype = GameplayObject();

MovementGuide.prototype.draw = function(context) {
  if(this.visible) {
    const x = this.shape.getCenterX();
    const y = this.shape.getCenterY();

    context.fillStyle = this.style;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    context.fillText(this.text, this.textX, this.textY);
  }
}

MovementGuide.prototype.onPlayerInside = function() {
  this.visible = false;
}