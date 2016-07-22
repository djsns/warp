'use strict';

function ObstacleRect(x, y, width, height) {
  if(!(this instanceof ObstacleRect))
    return new ObstacleRect(...arguments);

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

ObstacleRect.prototype.draw = function(context) {
  context.fillStyle = '#444444';
  context.fillRect(this.x, this.y, this.width, this.height);
}

ObstacleRect.prototype.touchesCircle = function(circle) {
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
  return circle.r > distance;
}