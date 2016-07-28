'use strict';

const levelFactory = {
  createLevelNumber : function(n) {
    return this.factories[n].call(this);
  },

  createTypicalPlayer : function(x, y) {
    return Player({
      shape : Circle({
        x : x,
        y : y,
        r : 10,
        style : '#FFFFFF',
        filled : true,
      }),
    });
  },
  
  createTypicalPlayerTrail : function() {
    return PlayerTrail({
      lineWidth : 2,
      smoothness : 8,
      style : '#555555',
    });
  },

  createTypicalGoal : function(x, y) {
    return Goal({
      shape : Circle({
        x : x,
        y : y,
        r : 30,
        style : '#FFFFFF',
        filled : false,
      }),
    });
  },

  createTypicalRectangleObstacle(method, x, y, width, height, style) {
    return Obstacle({
      shape : Rectangle[method]({
        x : x,
        y : y,
        width : width,
        height : height,
        style : style || '#444444',
      }),
    });
  },
  
  createTypicalBounds(width, height) {
    return Bounds({
      shape : Rectangle.fromCorner({
        x : 0,
        y : 0,
        width : width,
        height : height,
        style : 'transparent',
      }),
    });
  },

  factories : [
    function() {
      return Level({
        player : this.createTypicalPlayer(300, 300),
        playerTrail : this.createTypicalPlayerTrail(),
        gameplayObjects : [
          this.createTypicalBounds(600, 600),
          this.createTypicalGoal(500, 500),
          this.createTypicalRectangleObstacle('fromCorner', 0, 0, 600, 200),
        ],
      });
    },

    function() {
      return Level({
        player : this.createTypicalPlayer(60, 540),
        playerTrail : this.createTypicalPlayerTrail(),
        gameplayObjects : [
          this.createTypicalBounds(600, 600),
          this.createTypicalGoal(525, 60),
          this.createTypicalRectangleObstacle('fromCorner', 75, 0, 70, 120),
          this.createTypicalRectangleObstacle('fromCorner', 205, 0, 70, 120),
          this.createTypicalRectangleObstacle('fromCorner', 380, 0, 70, 120),
          this.createTypicalRectangleObstacle('fromCorner', 75, 120, 450, 120),
          this.createTypicalRectangleObstacle('fromCorner', 450, 240, 75, 120),
          this.createTypicalRectangleObstacle('fromCorner', 575, 120, 25, 240),
          this.createTypicalRectangleObstacle('fromCorner', 550, 120, 25, 120),
          this.createTypicalRectangleObstacle('fromCorner', 0, 300, 450, 60),
          this.createTypicalRectangleObstacle('fromCorner', 0, 360, 200, 120),
          this.createTypicalRectangleObstacle('fromCorner', 400, 360, 200, 120),
        ],
      });
    },
  ],
};