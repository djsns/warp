'use strict';

function Level(args) {
  if(!(this instanceof Level))
    return new Level(args);

  this.context = args.context;
  this.player = args.player;
  this.gameplayObjects = args.gameplayObjects;
  this.outcomeListeners = [];
  this.finalMessageListeners = [];
  this.respawnInfoListeners = [];
  this.victoryMessages = args.victoryMessages;
  this.failureMessages = args.failureMessages;
  this.isPaused = true;
  this.isFinished = false;

  this.handleRespawnInfo(args.respawnInfo);
  this.player.setParentLevel(this);
  this.gameplayObjects.forEach(o => o.beginObservingPlayer(this.player));
}

Level.prototype.draw = function() {
  this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  this.gameplayObjects.forEach(o => o.draw(this.context));
  this.player.draw(this.context);
}

Level.prototype.update = function(dt) {
  this.player.update(dt);
}

Level.prototype.frame = function(dt) {
  this.update(dt);
  this.draw();
}

Level.prototype.startGameLoop = function() {
  const gameLoopFrame = now => {
    if(!this.isPaused) {
      const dt = now - this.lastFrameTime;
      this.frame(dt);
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

Level.prototype.addFinalMessageListener = function(listener) {
  this.finalMessageListeners.push(listener);
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
  const finalMessage = this.getMessageForOutcome(outcome);
  this.finalMessageListeners.forEach(listener => listener(finalMessage));

  if(!outcome) {
    const respawnInfo = this.generateRespawnInfo();
    Object.freeze(respawnInfo);
    this.respawnInfoListeners.forEach(listener => listener(respawnInfo));
  }
}

Level.prototype.getMessageForOutcome = function(outcome) {
  if(outcome)
    return mathUtils.randomArrayElement(this.victoryMessages);
  else return mathUtils.randomArrayElement(this.failureMessages);
}