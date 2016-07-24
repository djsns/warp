'use strict';

function Rectangle({x, y, width, height, style}) {
  if(!(this instanceof Rectangle))
    return new Rectangle(...arguments);

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.style = style;
}

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

  let closestX = fitNumberIntoRange(circle.x, this.x, this.x+this.width);
  let closestY = fitNumberIntoRange(circle.y, this.y, this.y+this.height);

  let distance = Math.hypot(circle.x-closestX, circle.y - closestY);
  return distance < circle.r;
}