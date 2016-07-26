'use strict';

function Circle(args) {
  if(!(this instanceof Circle))
    return new Circle(args);

  this.x = args.x;
  this.y = args.y;
  this.r = args.r;
  this.filled = args.filled;
  this.style = args.style;
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

Circle.prototype.createOutline = function() {
  const outline = Object.assign(Object.create(this.__proto__), this);
  outline.filled = false;
  return outline;
}

Circle.prototype.draw = function(context) {
  if(this.filled)
    this.drawFilled(context);
  else this.drawEmpty(context);
}

Circle.prototype.drawFilled = function(context) {
  context.fillStyle = this.style;
  context.beginPath();
  context.arc(this.x, this.y, this.r, 0, Math.TAU);
  context.fill();
  context.closePath();
}

Circle.prototype.drawEmpty = function(context) {
  context.strokeStyle = this.style;
  context.lineWidth = 1;
  context.beginPath();
  context.arc(this.x, this.y, this.r-0.5, 0, Math.TAU);
  context.stroke();
  context.closePath();
}

Circle.prototype.touches = function(other) {
  if(other.touchesCircle)
    return other.touchesCircle(this);
  else return other.touches(this);
}

Circle.prototype.touchesCircle = function(otherCircle) {
  const distance = Math.hypot(otherCircle.x-this.x, otherCircle.y-this.y);
  const radiusSum = this.r+otherCircle.r;
  return distance <= radiusSum;
}

Circle.prototype.contains = function(other) {
  return other.isContainedByCircle(this);
}

Circle.prototype.isContainedByCircle = function(otherCircle) {
  const distance = Math.hypot(otherCircle.x-this.x, otherCircle.y-this.y);
  const radiusDifference = otherCircle.r-this.r;
  return distance <= radiusDifference;
}