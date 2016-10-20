'use strict';

function Game(args) {
  if(!(this instanceof Game))
    return new Game(args);

  this.banner = args.banner;
  this.levelFactory = args.levelFactory;
  this.currentLevelNumber = 0;
  this.levelCount = this.levelFactory.getLevelCount();
}

Game.prototype.startCurrentLevel = function() {
  this.banner.reset();

  const level = this.createCurrentLevel();
  const controller = Controller(level.player, level);

  if(this.currentLevelNumber === this.levelCount-1)
    this.banner.listenToLastLevel(level);
  else this.banner.listenToLevel(level);
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