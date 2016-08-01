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

  const level = this.levelFactory.createLevelNumber(this.currentLevelNumber);
  const controller = Controller(level.player, level);

  level.addResultListener(result => {
    if(result)
      this.banner.reportVictory();
    else this.banner.reportFailure();
  });

  level.startGameLoop(context);
}

Game.prototype.startNextLevel = function() {
  ++this.currentLevelNumber;
  this.startCurrentLevel();
}