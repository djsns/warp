'use strict';

function Game(args) {
  if(!(this instanceof Game))
    return new Game(args);

  this.banner = args.banner;
  this.levelFactory = args.levelFactory;
  this.currentLevelNumber = 0;
  this.audioContext = new (window.AudioContext || window.webkitAudioContext);
}

Game.prototype.startCurrentLevel = function() {
  this.banner.reset();

  const level = this.createCurrentLevel();
  const controller = Controller(level.player, level);

  this.banner.listenToLevel(level);

  level.addRespawnInfoListener(respawnInfo => {
    this.respawnInfo = respawnInfo;
  });

  level.startGameLoop(context);
}

Game.prototype.createCurrentLevel = function() {
  return this.levelFactory.createLevelNumber(this.currentLevelNumber, this.audioContext,
                                             this.respawnInfo);
}

Game.prototype.startNextLevel = function() {
  ++this.currentLevelNumber;
  this.respawnInfo = null;
  this.startCurrentLevel();
}