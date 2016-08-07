'use strict';

function Level(args) {
  if(!(this instanceof Level))
    return new Level(args);

  this.player = args.player;
  this.player.setParentLevel(this);
  this.playerTrail = args.playerTrail;
  if(this.playerTrail)
    this.playerTrail.beginObservingPlayer(this.player);
  this.gameplayObjects = args.gameplayObjects;
  this.gameplayObjects.forEach(o => {
    o.beginObservingPlayer(this.player);
  });
  this.resultListeners = [];
  this.isPaused = true;
  this.isFinished = false;
}

Level.prototype.draw = function(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  this.playerTrail.draw(context);
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

Level.prototype.addResultListener = function(o) {
  this.resultListeners.push(o);
}

Level.prototype.registerRespawn = function(respawn) {
  if(this.respawn)
    this.respawn.reset();
  this.respawn = respawn;
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
  this.player.stop();

  const result = {won : outcome};
  if(this.respawn) {
    result.respawnPosition = {
      x : this.respawn.getRespawnX(),
      y : this.respawn.getRespawnY(),
    };
  }
  Object.freeze(result);

  this.resultListeners.forEach(o => o(result));
}