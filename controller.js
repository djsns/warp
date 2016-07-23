'use strict';

function Controller(player) {
  if(!(this instanceof Controller))
    return new Controller(...arguments);

  this.player = player;
  this.actions = {
    37 : () => {this.player && this.player.nudgeLeft()},
    38 : () => {this.player && this.player.nudgeUp()},
    39 : () => {this.player && this.player.nudgeRight()},
    40 : () => {this.player && this.player.nudgeDown()}
  };

  let handleEvent = event => this.handleKey(event.keyCode);
  document.addEventListener('keydown', handleEvent);

  this.detach = function() {
    document.removeEventListener('keydown', handleEvent);
    this.player = null;
  }
}

Controller.prototype.handleKey = function(keyCode) {
  let action = this.actions[keyCode];
  if(action)
    action.call(this);
}