'use strict';

function Obstacle(args) {
  if(!(this instanceof Obstacle))
    return new Obstacle(args);

  this.shape = args.shape;
}

Obstacle.prototype = GameplayObject();

Obstacle.prototype.onPlayerTouch = function(player) {
  player.lose();
}