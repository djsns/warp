'use strict';

function Player(args) {
  if(!(this instanceof Player))
    return new Player(...arguments);

  this.shape = args.shape;
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
  this.ghostShape = null;
}

Object.defineProperty(Player.prototype, 'x', {
  set : function(x) {
    this.shape.setCenterX(x);
  },
  get : function() {
    return this.shape.getCenterX();
  }
});

Object.defineProperty(Player.prototype, 'y', {
  set : function(y) {
    this.shape.setCenterY(y);
  },
  get : function() {
    return this.shape.getCenterY();
  }
});

Player.prototype.saveGhost = function() {
  this.ghostShape = this.shape.createOutline();
}

Player.prototype.ghostWarp = function() {
  this.shape.setCenterX(this.ghostShape.getCenterX());
  this.shape.setCenterY(this.ghostShape.getCenterY());
  this.ghostShape = null;
  this.notifyObserversAboutWarp();
}

Player.prototype.notifyObserversAboutWarp = function() {
  this.positionObservers.forEach(o => o.afterPlayerWarped(this.x, this.y));
}

Player.prototype.notifyObserversAboutMovement = function() {
  this.positionObservers.forEach(o => o.afterPlayerMoved(this.x, this.y));
}

Player.prototype.draw = function(context) {
  this.shape.draw(context);
  if(this.ghostShape)
    this.ghostShape.draw(context);
}

Player.prototype.update = function(now) {
  let dt = now - this.previousUpdate;
  this.x += this.vx*dt;
  this.y += this.vy*dt;
  this.vx += this.ax;
  this.vy += this.ay;
  this.ax = 0;
  this.ay = 0;
  this.previousUpdate = now;
  if(this.speedWarpsEnabled)
    this.attemptSpeedWarp();
  this.applyVelocityCap();
  this.notifyObserversAboutMovement();
}

Player.prototype.applyVelocityCap = function() {
  let speed = this.getSpeed();
  if(speed > this.maxSpeed) {
    this.vx = this.maxSpeed * this.vx / speed;
    this.vy = this.maxSpeed * this.vy / speed;
  }
}

Player.prototype.attemptSpeedWarp = function() {
  let speed = this.getSpeed();
  if(speed > this.maxSpeed) {
    this.x += this.speedWarpDistance * this.vx / speed;
    this.y += this.speedWarpDistance * this.vy / speed;
    this.vx = 0;
    this.vy = 0;
    this.notifyObserversAboutWarp();
  }
}

Player.prototype.getSpeed = function() {
  return Math.hypot(this.vx, this.vy);
}

Player.prototype.addPositionObserver = function(o) {
  o.beginObservingPlayer(this.x, this.y);
  this.positionObservers.push(o);
}

Player.prototype.stop = function() {
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
}

Player.prototype.nudgeUp = function() {
  this.ay = -this.nudgeSize;
}

Player.prototype.nudgeDown = function() {
  this.ay = this.nudgeSize;
}

Player.prototype.nudgeLeft = function() {
  this.ax = -this.nudgeSize;
}

Player.prototype.nudgeRight = function() {
  this.ax = this.nudgeSize;
}