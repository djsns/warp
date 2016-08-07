'use strict';

function Shape() {
  if(!(this instanceof Shape))
    return new Shape();
}

Shape.prototype.touches = function(other) {
  const thisShapeName = this.getShapeName();
  if('touches'+thisShapeName in other)
    return other['touches'+thisShapeName](this);
  else return other.touches(this);
}

Shape.prototype.contains = function(other) {
  return this['contains'+other.getShapeName()](other);
}