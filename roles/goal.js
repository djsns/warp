'use strict';

function Goal({shape}) {
  if(!(this instanceof Goal))
    return new Goal(...arguments);

  this.shape = shape;
}

Goal.prototype.setParentLevel = function(parentLevel) {
  this.parentLevel = parentLevel;
}

Goal.prototype.draw = function(context) {
  this.shape.draw(context);
}

Goal.prototype.handlePlayer = function(player) {
  if(this.shape.contains(player.shape))
    this.parentLevel.win();
}