'use strict';

function PlayerTrail(args) {
  if(!(this instanceof PlayerTrail))
    return new PlayerTrail(args);

  this.path = new Path2D;
  this.minStep = args.smoothness;
  this.lineWidth = args.lineWidth;
  this.style = args.style;
}

PlayerTrail.prototype = GameplayObject();

PlayerTrail.prototype.draw = function(context) {
  context.strokeStyle = this.style;
  context.lineWidth = this.lineWidth;
  context.stroke(this.path);
}

PlayerTrail.prototype.beginObservingPlayer = function(player) {
  player.addMovementObserver(this);
  player.addWarpObserver(this);
  this.path.moveTo(player.x, player.y);
  this.setPrevious(player.x, player.y);
}

PlayerTrail.prototype.afterPlayerMoved = function(player) {
  if(Math.hypot(player.x-this.previousX, player.y-this.previousY) >= this.minStep) {
    this.path.lineTo(player.x, player.y);
    this.setPrevious(player.x, player.y);
  }
}

PlayerTrail.prototype.afterPlayerWarped = function(player) {
  this.path.moveTo(player.x, player.y);
  this.setPrevious(player.x, player.y);
}

PlayerTrail.prototype.setPrevious = function(x, y) {
  this.previousX = x;
  this.previousY = y;
}