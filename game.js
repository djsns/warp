'use strict';

function Game(args) {
  if(!(this instanceof Game))
    return new Game(args);

  this.banner = args.banner;
  this.levelFactory = args.levelFactory;
  this.currentLevelNumber = 0;
}

Game.prototype.startCurrentLevel = function() {
  this.banner.reset();

  const level = this.createCurrentLevel();
  const controller = Controller(level.player, level);

  level.addResultListener(result => {
    if(result.won)
      this.banner.reportVictory();
    else this.banner.reportFailure();
  });

  level.addResultListener(result => {
    this.previousAttemptResult = result;
  });

  level.startGameLoop(context);
}

Game.prototype.createCurrentLevel = function() {
  if(this.previousAttemptResult && this.previousAttemptResult.respawnPosition) {
    return this.levelFactory.createLevelWithCustomPlayerPosition(this.currentLevelNumber, this.previousAttemptResult.respawnPosition);
  } else {
    return this.levelFactory.createLevelNumber(this.currentLevelNumber);
  }
}

Game.prototype.startNextLevel = function() {
  ++this.currentLevelNumber;
  this.previousAttemptResult = null;
  this.startCurrentLevel();
}