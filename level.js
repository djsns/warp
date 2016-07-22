'use strict';

function Level(levelInfo) {
  if(!(this instanceof Level))
    return new Level(...arguments);

  this.circle = Circle(levelInfo.circle.x,
                       levelInfo.circle.y,
                       levelInfo.circle.r);

  this.circleTrail = CircleTrail(levelInfo.circle.trail.lineWidth,
                                 levelInfo.circle.trail.smoothness);

  this.circle.addPositionObserver(this.circleTrail);
  
  this.obstacles = levelInfo.obstacles.map(obstacleInfo =>
    ObstacleRect(obstacleInfo.x, obstacleInfo.y, obstacleInfo.width, obstacleInfo.height));
}

Level.prototype.draw = function(context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  this.obstacles.forEach(o => o.draw(context));
  this.circleTrail.draw(context);
  this.circle.draw(context);
}

Level.prototype.update = function(now) {
  this.circle.update(now);
}

Level.prototype.frame = function(context, now) {
  this.update(now);
  this.draw(context);
}

Level.prototype.isLost = function() {
  return this.obstacles.some(o => o.touchesCircle(this.circle));
}

Level.prototype.isWon = function() {
  return false;
}