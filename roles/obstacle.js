'use strict';

function Obstacle({shape}) {
  if(!(this instanceof Obstacle))
    return new Obstacle(...arguments);

  this.shape = shape;
}

Obstacle.prototype = GameplayShape();

Obstacle.prototype.onPlayerTouch = function() {
  this.parentLevel.lose();
}