'use strict';

function Controller(player, level) {
  if(!(this instanceof Controller))
    return new Controller(player, level);

  this.player = player;
  this.level = level;
  this.keyActions = {
    keydown : {
      17 : () => {this.player && this.player.saveGhost()},
      37 : () => {this.player && this.player.nudgeLeft()},
      65 : () => {this.player && this.player.nudgeLeft()},
      38 : () => {this.player && this.player.nudgeUp()},
      87 : () => {this.player && this.player.nudgeUp()},
      39 : () => {this.player && this.player.nudgeRight()},
      68 : () => {this.player && this.player.nudgeRight()},
      40 : () => {this.player && this.player.nudgeDown()},
      83 : () => {this.player && this.player.nudgeDown()},
    },

    keyup : {
      17 : () => {this.player && this.player.ghostWarp()},
    },
  };

  this.handleVisibilityChange = () => {
    if(document.hidden)
      this.level && this.level.pauseGameLoop();
    else this.level && this.level.startGameLoop(context);
  };

  this.handleKeyEvent = event => {
    const action = this.keyActions[event.type] && this.keyActions[event.type][event.keyCode];
    if(action)
      action.call(this);
  };

  document.addEventListener('keydown', this.handleKeyEvent);
  document.addEventListener('keyup', this.handleKeyEvent);
  document.addEventListener('visibilitychange', this.handleVisibilityChange);

  this.detach = () => {
    document.removeEventListener('keydown', this.handleKeyEvent);
    document.removeEventListener('keyup', this.handleKeyEvent);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.player = null;
    this.level = null;
  }

  this.level.addResultListener(this.detach);
}