'use strict';

function Controller(circle) {
  if(!(this instanceof Controller))
    return new Controller(...arguments);

  this.circle = circle;
  this.actions = {
    37 : () => {this.circle && this.circle.nudgeLeft()},
    38 : () => {this.circle && this.circle.nudgeUp()},
    39 : () => {this.circle && this.circle.nudgeRight()},
    40 : () => {this.circle && this.circle.nudgeDown()}
  };
  document.addEventListener('keydown', event => this.handleKey(event.keyCode));
}

Controller.prototype.handleKey = function(keyCode) {
  let action = this.actions[keyCode];
  if(action)
    action.call(this);
}