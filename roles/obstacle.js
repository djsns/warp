'use strict';

function Obstacle({shape}) {
  if(!(this instanceof Obstacle))
    return new Obstacle(...arguments);

  this.shape = shape;
}

Obstacle.prototype.setParentLevel = function(parentLevel) {
  this.parentLevel = parentLevel;
}

Obstacle.prototype.draw = function(context) {
  this.shape.draw(context);
}

Obstacle.prototype.handlePlayer = function(player) {
  if(this.shape.touches(player.shape))
    this.parentLevel.lose();
}