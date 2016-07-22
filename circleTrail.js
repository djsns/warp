'use strict';

function CircleTrail(lineWidth, smoothness) {
  if(!(this instanceof CircleTrail))
    return new CircleTrail(...arguments);

  this.path = new Path2D;
  this.minStep = smoothness;
}

CircleTrail.prototype.draw = function(context) {
  context.strokeStyle = "#AAAAAA";
  context.lineWidth = this.lineWidth;
  context.stroke(this.path);
}

CircleTrail.prototype.beginObservingCircle = function(x, y) {
  this.path.moveTo(x, y);
  this.setPrevious(x, y);
}

CircleTrail.prototype.afterCirclePositionUpdate = function(x, y) {
  if(Math.hypot(x-this.previousX, y-this.previousY) >= this.minStep) {
    this.path.lineTo(x, y);
    this.setPrevious(x, y);
  }
}

CircleTrail.prototype.setPrevious = function(x, y) {
  this.previousX = x;
  this.previousY = y;
}