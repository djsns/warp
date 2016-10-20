'use strict';

function KeyGuide(args) {
  if(!(this instanceof KeyGuide))
    return new KeyGuide(args);

  this.shape = args.shape;
  this.wasdRadius = args.wasdRadius;
  this.arrowRadius = args.arrowRadius;
  this.style = args.style;
  this.fontFamily = args.fontFamily;
  this.fontSize = args.fontSize;
  this.visible = true;
}

KeyGuide.prototype = GameplayObject();

KeyGuide.prototype.draw = function(context) {
  if(this.visible) {
    const x = this.shape.getCenterX();
    const y = this.shape.getCenterY();

    context.fillStyle = this.style;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    context.fillText('w', x, y-this.wasdRadius);
    context.fillText('d', x+this.wasdRadius, y);
    context.fillText('s', x, y+this.wasdRadius);
    context.fillText('a', x-this.wasdRadius, y);

    context.fillText('↑', x, y-this.arrowRadius);
    context.fillText('→', x+this.arrowRadius, y);
    context.fillText('↓', x, y+this.arrowRadius);
    context.fillText('←', x-this.arrowRadius, y);
  }
}

KeyGuide.prototype.onPlayerNotInside = function() {
  this.visible = false;
}