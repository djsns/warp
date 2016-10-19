'use strict';

function Game(args) {
  if(!(this instanceof Game))
    return new Game(args);

  this.banner = args.banner;
  this.levelFactory = args.levelFactory;
  this.currentLevelNumber = 0;
}

Game.prototype.startCurrentLevel = function() {
  this.banner.resetForLevel(this.currentLevelNumber);

  const level = this.createCurrentLevel();
  const controller = Controller(level.player, level);

  this.banner.listenToLevel(level);
  level.addRespawnInfoListener(respawnInfo => {
    this.respawnInfo = respawnInfo;
  });

  level.startGameLoop();
}

Game.prototype.createCurrentLevel = function() {
  return this.levelFactory.createLevelNumber(this.currentLevelNumber, this.respawnInfo);
}

Game.prototype.startNextLevel = function() {
  ++this.currentLevelNumber;
  this.respawnInfo = null;
  this.startCurrentLevel();
}