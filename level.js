'use strict';

function Level(args) {
  if(!(this instanceof Level))
    return new Level(args);

  this.player = args.player;
  this.playerTrail = args.playerTrail;
  if(this.playerTrail)
    this.player.addPositionObserver(this.playerTrail);
  this.gameplayObjects = args.gameplayObjects;
  this.gameplayObjects.forEach(o => o.setParentLevel(this));
  this.resultListeners = [];
  this.isPaused = true;
  this.isFinished = false;
}

Level.prototype.draw = function(context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  this.playerTrail.draw(context);
  this.gameplayObjects.forEach(o => o.draw(context));
  this.player.draw(context);
}

Level.prototype.update = function(dt) {
  this.player.update(dt);
  this.gameplayObjects.forEach(o => o.handlePlayer(this.player));
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

Level.prototype.addResultListener = function(o) {
  this.resultListeners.push(o);
}

Level.prototype.win = function() {
  if(this.isFinished)
    return;
  this.isFinished = true;
  this.player.stop();
  this.resultListeners.forEach(o => o(true));
}

Level.prototype.lose = function() {
  if(this.isFinished)
    return;
  this.isFinished = true;
  this.player.stop();
  this.resultListeners.forEach(o => o(false));
}