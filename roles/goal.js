'use strict';

function Goal(args) {
  if(!(this instanceof Goal))
    return new Goal(...arguments);

  this.shape = args.shape;
}

Goal.prototype = GameplayShape();

Goal.prototype.onPlayerInside = function() {
  this.parentLevel.win();
}