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
  this.isLost = false;
  this.isWon = false;
}

Level.prototype.draw = function(context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  this.playerTrail.draw(context);
  this.gameplayObjects.forEach(o => o.draw(context));
  this.player.draw(context);
}

Level.prototype.update = function(now) {
  this.player.update(now);
  this.gameplayObjects.forEach(o => o.handlePlayer(this.player));
}

Level.prototype.frame = function(context, now) {
  this.update(now);
  this.draw(context);
}

Level.prototype.gameLoop = function(context, callback) {
  const gameLoopFrame = now => {
    this.frame(context, now);
    if(this.isWon || this.isLost) {
      this.player.stop();
      callback(this.isWon);
    }
    window.requestAnimationFrame(gameLoopFrame);
  }

  window.requestAnimationFrame(gameLoopFrame);
}

Level.prototype.win = function() {
  this.isWon = true;
}

Level.prototype.lose = function() {
  this.isLost = true;
}