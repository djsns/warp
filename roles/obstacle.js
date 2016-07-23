'use strict';

function Obstacle(shape, parentLevel) {
  if(!(this instanceof Obstacle))
    return new Obstacle(...arguments);

  this.shape = shape;
  this.parentLevel = parentLevel;
}

Obstacle.prototype.draw = function(context) {
  this.shape.draw(context);
}

Obstacle.prototype.handlePlayer = function(player) {
  if(this.shape.touches(player.shape))
    this.parentLevel.lose();
}