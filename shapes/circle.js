'use strict';

function Circle({x, y, r, style, lineWidth}) {
  if(!(this instanceof Circle))
    return new Circle(...arguments);

  this.x = x;
  this.y = y;
  this.r = r;
  this.filled = !lineWidth;
  if(lineWidth)
    this.lineWidth = lineWidth;
  this.style = style;
}

Circle.prototype.getCenterX = function() {
  return this.x;
}

Circle.prototype.getCenterY = function() {
  return this.y;
}

Circle.prototype.setCenterX = function(x) {
  this.x = x;
}

Circle.prototype.setCenterY = function(y) {
  this.y = y;
}

Circle.prototype.draw = function(context) {
  if(this.filled) {
    context.fillStyle = this.style;
  } else {
    context.strokeStyle = this.style;
    context.lineWidth = this.lineWidth;
  }
  context.beginPath();
  context.arc(this.x, this.y, this.r, 0, Math.TAU);
  if(this.filled)
    context.fill();
  else context.stroke();
  context.closePath();
}

Circle.prototype.touches = function(other) {
  if(other.touchesCircle)
    return other.touchesCircle(this);
  else return other.touches(this);
}

Circle.prototype.touchesCircle = function(otherCircle) {
  let distance = Math.hypot(otherCircle.x-this.x, otherCircle.y-this.y);
  let radiusSum = this.r+otherCircle.r;
  return distance <= radiusSum;
}

Circle.prototype.contains = function(other) {
  return other.isContainedByCircle(this);
}

Circle.prototype.isContainedByCircle = function(otherCircle) {
  let distance = Math.hypot(otherCircle.x-this.x, otherCircle.y-this.y);
  let radiusDifference = otherCircle.r-this.r;
  return distance <= radiusDifference;
}