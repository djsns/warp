'use strict';

function Goal(args) {
  if(!(this instanceof Goal))
    return new Goal(args);

  this.shape = args.shape;
}

Goal.prototype = GameplayObject();

Goal.prototype.onPlayerInside = function(player) {
  player.win();
}

Goal.prototype.isStatic = function() {
  return true;
}