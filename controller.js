'use strict';

function Controller(player) {
  if(!(this instanceof Controller))
    return new Controller(player);

  this.player = player;
  this.actions = {
    keydown : {
      17 : () => {this.player && this.player.saveGhost()},
      37 : () => {this.player && this.player.nudgeLeft()},
      38 : () => {this.player && this.player.nudgeUp()},
      39 : () => {this.player && this.player.nudgeRight()},
      40 : () => {this.player && this.player.nudgeDown()},
    },

    keyup : {
      17 : () => {this.player && this.player.ghostWarp()},
    },
  };

  this.handleKeyEvent = event => {
    let action = this.actions[event.type] && this.actions[event.type][event.keyCode];
    if(action)
      action.call(this);
  };

  document.addEventListener('keydown', this.handleKeyEvent);
  document.addEventListener('keyup', this.handleKeyEvent);

  this.detach = function() {
    document.removeEventListener('keydown', this.handleKeyEvent);
    document.removeEventListener('keyup', this.handleKeyEvent);
    this.player = null;
  }
}