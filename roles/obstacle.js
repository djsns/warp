'use strict';

function Obstacle(args) {
  if(!(this instanceof Obstacle))
    return new Obstacle(...arguments);

  this.shape = args.shape;
}

Obstacle.prototype = GameplayShape();

Obstacle.prototype.onPlayerTouch = function() {
  this.parentLevel.lose();
}