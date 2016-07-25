'use strict';

function PlayerTrail({lineWidth, smoothness, style}) {
  if(!(this instanceof PlayerTrail))
    return new PlayerTrail(...arguments);

  this.path = new Path2D;
  this.minStep = smoothness;
  this.style = style;
}

PlayerTrail.prototype.draw = function(context) {
  context.strokeStyle = this.style;
  context.lineWidth = this.lineWidth;
  context.stroke(this.path);
}

PlayerTrail.prototype.beginObservingPlayer = function(x, y) {
  this.path.moveTo(x, y);
  this.setPrevious(x, y);
}

PlayerTrail.prototype.afterPlayerMoved = function(x, y) {
  if(Math.hypot(x-this.previousX, y-this.previousY) >= this.minStep) {
    this.path.lineTo(x, y);
    this.setPrevious(x, y);
  }
}

PlayerTrail.prototype.afterPlayerWarped = function(x, y) {
  this.beginObservingPlayer(x, y);
}

PlayerTrail.prototype.setPrevious = function(x, y) {
  this.previousX = x;
  this.previousY = y;
}