'use strict';

function GoalCircle(x, y, r) {
  if(!(this instanceof GoalCircle))
    return new GoalCircle(...arguments);

  this.x = x;
  this.y = y;
  this.r = r;
}

GoalCircle.prototype.draw = function(context) {
  context.strokeStyle = '#FFFFFF';
  context.lineWidth = 1;

  context.beginPath();
  context.arc(this.x, this.y, this.r, 0, Math.TAU);
  context.stroke();
  context.closePath();
}

GoalCircle.prototype.isAchievedByCircle = function(circle) {
  let distance = Math.hypot(circle.x-this.x, circle.y-this.y);
  let radiusDifference = this.r-circle.r;
  return distance <= radiusDifference;
}