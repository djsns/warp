'use strict';

function Player(args) {
  if(!(this instanceof Player))
    return new Player(args);

  this.shape = args.shape;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.nudgeSize = 0.005;
  this.maxSpeed = 0.1;
  this.movementObservers = [];
  this.warpObservers = [];
  this.speedWarpDistance = 100;
  this.speedWarpsEnabled = true;
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

Player.prototype.notifyObserversAboutWarp = function() {
  this.warpObservers.forEach(o => o.afterPlayerWarped(this));
}

Player.prototype.notifyObserversAboutMovement = function() {
  this.movementObservers.forEach(o => o.afterPlayerMoved(this));
}

Player.prototype.draw = function(context) {
  this.shape.draw(context);
}

Player.prototype.update = function(dt) {
  this.x += this.vx*dt;
  this.y += this.vy*dt;
  this.vx += this.ax;
  this.vy += this.ay;
  this.ax = 0;
  this.ay = 0;
  if(this.speedWarpsEnabled)
    this.attemptSpeedWarp();
  this.applyVelocityCap();
  this.notifyObserversAboutMovement();
}

Player.prototype.applyVelocityCap = function() {
  const speed = this.getSpeed();
  if(speed > this.maxSpeed) {
    this.vx = this.maxSpeed * this.vx / speed;
    this.vy = this.maxSpeed * this.vy / speed;
  }
}

Player.prototype.attemptSpeedWarp = function() {
  const speed = this.getSpeed();
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

Player.prototype.addMovementObserver = function(o) {
  this.movementObservers.push(o);
}

Player.prototype.addWarpObserver = function(o) {
  this.warpObservers.push(o);
}

Player.prototype.setParentLevel = function(parentLevel) {
  this.parentLevel = parentLevel;
}

Player.prototype.win = function() {
  this.parentLevel.win();
}

Player.prototype.lose = function() {
  this.parentLevel.lose();
}

Player.prototype.registerRespawn = function(respawn) {
  this.parentLevel.registerRespawn(respawn);
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