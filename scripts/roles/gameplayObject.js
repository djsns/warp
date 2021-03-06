'use strict';

function GameplayObject() {
  if(!(this instanceof GameplayObject))
    return new GameplayObject();
}

GameplayObject.prototype.beginObservingPlayer = function(player) {
  player.addMovementObserver(this);
}

GameplayObject.prototype.draw = function(context) {
  this.shape.draw(context);
}

GameplayObject.prototype.afterPlayerMoved = function(player) {
  const containsPlayer = this.shape.contains(player.shape);
  const touchesPlayer = this.shape.touches(player.shape);
  if(containsPlayer)
    this.onPlayerInside(player);
  else this.onPlayerNotInside(player);
  if(touchesPlayer)
    this.onPlayerTouch(player);
}

GameplayObject.prototype.onPlayerInside = function() {}
GameplayObject.prototype.onPlayerNotInside = function() {}
GameplayObject.prototype.onPlayerTouch = function() {}