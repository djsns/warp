'use strict';

function Level({player, playerTrail, obstacles, goal}) {
  if(!(this instanceof Level))
    return new Level(...arguments);

  this.player = player;
  this.playerTrail = playerTrail;
  if(this.playerTrail)
    this.player.addPositionObserver(this.playerTrail);
  this.obstacles = obstacles;
  this.obstacles.forEach(o => o.setParentLevel(this));
  this.goal = goal;
  this.isLost = false;
  this.isWon = false;
}

Level.prototype.draw = function(context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  this.obstacles.forEach(o => o.draw(context));
  this.playerTrail.draw(context);
  this.goal.draw(context);
  this.player.draw(context);
}

Level.prototype.update = function(now) {
  this.player.update(now);
  this.goal.handlePlayer(this.player);
  this.obstacles.forEach(o => o.handlePlayer(this.player));
}

Level.prototype.frame = function(context, now) {
  this.update(now);
  this.draw(context);
  if(this.isLost)
    return false;
  else if(this.isWon)
    return true;
}

Level.prototype.gameLoop = function(context, callback) {
  let gameLoopFrame = now => {
    let result = this.frame(context, now);
    if(result !== undefined) {
      this.player.stop();
      callback(result);
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