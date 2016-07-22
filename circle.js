'use strict';

function Circle(x, y, r) {
  if(!(this instanceof Circle))
    return new Circle(...arguments);

  this.x = x;
  this.y = y;
  this.r = r;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.previousUpdate = performance.now();
  this.nudgeSize = 0.005;
  this.maxSpeed = 0.1;
  this.positionObservers = [];
  this.speedWarpDistance = 100;
  this.speedWarpsEnabled = true;
}

Circle.prototype.draw = function(context) {
  context.strokeStyle = '#FFFFFF';
  context.fillStyle = context.strokeStyle;
  context.lineWidth = 1;

  context.beginPath();
  context.arc(this.x, this.y, this.r, 0, Math.TAU);
  context.fill();
  context.closePath();
}

Circle.prototype.update = function(now) {
  let dt = now - this.previousUpdate;
  this.x += this.vx*dt /*+ this.ax*dt*dt*/;
  this.y += this.vy*dt /*+ this.ay*dt*dt*/;
  this.vx += this.ax;
  this.vy += this.ay;
  this.ax = 0;
  this.ay = 0;
  this.previousUpdate = now;
  let warped = this.applyVelocityCap();
  this.positionObservers.forEach(o =>
    o.afterCirclePositionUpdate(this.x, this.y, warped));
}

Circle.prototype.applyVelocityCap = function() {
  if(this.speedWarpsEnabled)
    return this.applyVelocityCapWithWarps();
  else this.applyVelocityCapWithoutWarps();
}

Circle.prototype.applyVelocityCapWithoutWarps = function() {
  let speed = this.getSpeed();
  if(speed > this.maxSpeed) {
    this.vx = this.maxSpeed * this.vx / speed;
    this.vy = this.maxSpeed * this.vy / speed;
  }
}

Circle.prototype.applyVelocityCapWithWarps = function() {
  let speed = this.getSpeed();
  if(speed > this.maxSpeed) {
    this.x += this.speedWarpDistance * this.vx / speed;
    this.y += this.speedWarpDistance * this.vy / speed;
    this.vx = 0;
    this.vy = 0;
    return true;
  }
  return false;
}

Circle.prototype.getSpeed = function() {
  return Math.hypot(this.vx, this.vy);
}

Circle.prototype.addPositionObserver = function(o) {
  o.beginObservingCircle(this.x, this.y);
  this.positionObservers.push(o);
}

Circle.prototype.nudgeUp = function() {
  this.ay = -this.nudgeSize;
}

Circle.prototype.nudgeDown = function() {
  this.ay = this.nudgeSize;
}

Circle.prototype.nudgeLeft = function() {
  this.ax = -this.nudgeSize;
}

Circle.prototype.nudgeRight = function() {
  this.ax = this.nudgeSize;
}