'use strict';

function Goal(shape, parentLevel) {
  if(!(this instanceof Goal))
    return new Goal(...arguments);

  this.shape = shape;
  this.parentLevel = parentLevel;
}

Goal.prototype.draw = function(context) {
  this.shape.draw(context);
}

Goal.prototype.handlePlayer = function(player) {
  if(this.shape.contains(player.shape))
    this.parentLevel.win();
}