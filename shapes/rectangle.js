'use strict';

function Rectangle(args) {
  if(!(this instanceof Rectangle))
    return new Rectangle(args);

  this.x = args.x;
  this.y = args.y;
  this.width = args.width;
  this.height = args.height;
  this.style = args.style;
}

Rectangle.fromCenter = function(args) {
  const result = Rectangle(args);
  result.setCenterX(args.x);
  result.setCenterY(args.y);
  return result;
}

Rectangle.fromCorner = Rectangle;

Rectangle.prototype.getCenterX = function() {
  return this.x + this.width/2;
}

Rectangle.prototype.getCenterY = function() {
  return this.y + this.height/2;
}

Rectangle.prototype.setCenterX = function(x) {
  this.x = x - this.width/2;
}

Rectangle.prototype.setCenterY = function(y) {
  this.y = y - this.height/2;
}

Rectangle.prototype.draw = function(context) {
  context.fillStyle = this.style;
  context.fillRect(this.x, this.y, this.width, this.height);
}

Rectangle.prototype.touches = function(other) {
  if(other.touchesRectangle)
    return other.touchesRectangle(this);
  else return other.touches(this);
}

Rectangle.prototype.touchesCircle = function(circle) {
  function fitNumberIntoRange(x, min, max) {
    if(x < min)
      return min;
    else if(x > max)
      return max;
    else return x;
  }

  const closestX = fitNumberIntoRange(circle.x, this.x, this.x+this.width);
  const closestY = fitNumberIntoRange(circle.y, this.y, this.y+this.height);

  const distance = Math.hypot(circle.x-closestX, circle.y - closestY);
  return distance < circle.r;
}