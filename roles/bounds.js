'use strict';

function Bounds(args) {
  if(!(this instanceof Bounds))
    return new Bounds(args);

  this.shape = args.shape;
}

Bounds.prototype = GameplayObject();

Bounds.prototype.onPlayerNotInside = function() {
  this.parentLevel.lose();
}