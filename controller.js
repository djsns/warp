'use strict';

function Controller(player, level) {
  if(!(this instanceof Controller))
    return new Controller(player, level);

  this.player = player;
  this.level = level;
  this.keyDownActions = {
    37 : () => {this.player && this.player.nudgeLeft()},
    65 : () => {this.player && this.player.nudgeLeft()},
    38 : () => {this.player && this.player.nudgeUp()},
    87 : () => {this.player && this.player.nudgeUp()},
    39 : () => {this.player && this.player.nudgeRight()},
    68 : () => {this.player && this.player.nudgeRight()},
    40 : () => {this.player && this.player.nudgeDown()},
    83 : () => {this.player && this.player.nudgeDown()},
  };

  this.handleVisibilityChange = () => {
    if(document.hidden)
      this.level && this.level.pauseGameLoop();
    else this.level && this.level.startGameLoop(context);
  };

  this.handleKeyDown = event => {
    const action = this.keyDownActions[event.keyCode];
    if(action)
      action.call(this);
  };

  document.addEventListener('keydown', this.handleKeyDown);
  document.addEventListener('visibilitychange', this.handleVisibilityChange);

  this.detach = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.player = null;
    this.level = null;
  }

  this.level.addOutcomeListener(this.detach);
}