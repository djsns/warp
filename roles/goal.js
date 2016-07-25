'use strict';

function Goal({shape}) {
  if(!(this instanceof Goal))
    return new Goal(...arguments);

  this.shape = shape;
}

Goal.prototype = GameplayShape();

Goal.prototype.onPlayerInside = function() {
  this.parentLevel.win();
}