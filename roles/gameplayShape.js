'use strict';

function GameplayShape() {
  if(!(this instanceof GameplayShape))
    return new GameplayShape(...arguments);
}

GameplayShape.prototype.setParentLevel = function(parentLevel) {
  this.parentLevel = parentLevel;
}

GameplayShape.prototype.draw = function(context) {
  this.shape.draw(context);
}

GameplayShape.prototype.handlePlayer = function(player) {
  if(this.onPlayerInside && this.shape.contains(player.shape))
    this.onPlayerInside(player);
  if(this.onPlayerTouch && this.shape.touches(player.shape))
    this.onPlayerTouch(player);
}