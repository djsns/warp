'use strict';

function Level(args) {
  if(!(this instanceof Level))
    return new Level(args);

  this.player = args.player;
  this.gameplayObjects = args.gameplayObjects;
  this.outcomeListeners = [];
  this.respawnInfoListeners = [];
  this.isPaused = true;
  this.isFinished = false;

  this.handleRespawnInfo(args.respawnInfo);
  this.player.setParentLevel(this);
  this.gameplayObjects.forEach(o => o.beginObservingPlayer(this.player));
}

Level.prototype.draw = function(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  this.gameplayObjects.forEach(o => o.draw(context));
  this.player.draw(context);
}

Level.prototype.update = function(dt) {
  this.player.update(dt);
}

Level.prototype.frame = function(context, dt) {
  this.update(dt);
  this.draw(context);
}

Level.prototype.startGameLoop = function(context) {
  const gameLoopFrame = now => {
    if(!this.isPaused) {
      const dt = now - this.lastFrameTime;
      this.frame(context, dt);
      window.requestAnimationFrame(gameLoopFrame);
    }
    this.lastFrameTime = now;
  }

  this.isPaused = false;
  this.lastFrameTime = performance.now();
  window.requestAnimationFrame(gameLoopFrame);
}

Level.prototype.pauseGameLoop = function() {
  this.isPaused = true;
}

Level.prototype.addOutcomeListener = function(listener) {
  this.outcomeListeners.push(listener);
}

Level.prototype.addRespawnInfoListener = function(listener) {
  this.respawnInfoListeners.push(listener);
}

Level.prototype.generateRespawnInfo = function() {
  return this.player.generateRespawnInfo();
}

Level.prototype.handleRespawnInfo = function(respawnInfo) {
  this.player.handleRespawnInfo(respawnInfo);
}

Level.prototype.win = function() {
  this.finishWithOutcome(true);
}

Level.prototype.lose = function() {
  this.finishWithOutcome(false);
}

Level.prototype.finishWithOutcome = function(outcome) {
  if(this.isFinished)
    return;

  this.isFinished = true;
  this.pauseGameLoop();
  this.player.stop();

  this.outcomeListeners.forEach(listener => listener(outcome));

  if(!outcome) {
    const respawnInfo = this.generateRespawnInfo();
    Object.freeze(respawnInfo);
    this.respawnInfoListeners.forEach(listener => listener(respawnInfo));
  }
}