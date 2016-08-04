'use strict';

function Checkpoint(args) {
  if(!(this instanceof Checkpoint))
    return new Checkpoint(args);

  this.shape = args.shape;
  this.activeStyle = args.activeStyle;
  this.achievedStyle = args.achievedStyle;
  this.reset();
}

Checkpoint.prototype = GameplayObject();

Checkpoint.prototype.onPlayerInside = function() {
  if(this.isActive) {
    this.parentLevel.registerRespawn(this);
    this.markAsAchieved();
  }
}

Checkpoint.prototype.reset = function() {
  this.isActive = true;
  this.shape.style = this.activeStyle;
  this.shape.filled = false;
}

Checkpoint.prototype.markAsAchieved = function() {
  this.isActive = false;
  this.shape.style = this.achievedStyle;
  this.shape.filled = true;
}

Checkpoint.prototype.getRespawnX = function() {
  return this.shape.getCenterX();
}

Checkpoint.prototype.getRespawnY = function() {
  return this.shape.getCenterY();
}