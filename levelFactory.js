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
      style : '#444444',
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

    function() {
      return Level({
        player : this.createTypicalPlayer(40, 30),
        playerTrail : this.createTypicalPlayerTrail(),
        gameplayObjects : [
          this.createTypicalBounds(600, 600),
          this.createTypicalGoal(560, 60),
          this.createTypicalRectangleObstacle('fromCorner', 0, 0, 20, 60, 'blue'),
          this.createTypicalRectangleObstacle('fromCorner', 0, 120, 20, 60, 'blue'),
          this.createTypicalRectangleObstacle('fromCorner', 40, 180, 20, 120, 'yellow'),
          this.createTypicalRectangleObstacle('fromCorner', 20, 300, 40, 60, 'blue'),
          this.createTypicalRectangleObstacle('fromCorner', 40, 360, 40, 60, 'blue'),
          this.createTypicalRectangleObstacle('fromCorner', 20, 420, 40, 60, 'blue'),
          this.createTypicalRectangleObstacle('fromCorner', 0, 480, 20, 120, 'orange'),
          this.createTypicalRectangleObstacle('fromCorner', 40, 540, 40, 60, 'yellow'),
          this.createTypicalRectangleObstacle('fromCorner', 80, 480, 40, 60, 'teal'),
          this.createTypicalRectangleObstacle('fromCorner', 120, 540, 120, 60, 'purple'),
          this.createTypicalRectangleObstacle('fromCorner', 280, 540, 120, 60, 'purple'),
          this.createTypicalRectangleObstacle('fromCorner', 440, 540, 120, 60, 'purple'),
          this.createTypicalRectangleObstacle('fromCorner', 180, 480, 40, 60, 'chartreuse'),
          this.createTypicalRectangleObstacle('fromCorner', 280, 480, 40, 60, 'chartreuse'),
          this.createTypicalRectangleObstacle('fromCorner', 320, 300, 40, 180, 'navy'),
          this.createTypicalRectangleObstacle('fromCorner', 360, 360, 40, 120, 'navy'),
          this.createTypicalRectangleObstacle('fromCorner', 400, 420, 40, 120, 'navy'),
          this.createTypicalRectangleObstacle('fromCorner', 440, 360, 80, 120, 'navy'),
          this.createTypicalRectangleObstacle('fromCorner', 520, 420, 20, 60, 'indianred'),
          this.createTypicalRectangleObstacle('fromCorner', 520, 360, 40, 60, 'indianred'),
          this.createTypicalRectangleObstacle('fromCorner', 540, 300, 40, 60, 'indianred'),
          this.createTypicalRectangleObstacle('fromCorner', 560, 240, 40, 60, 'indianred'),
          this.createTypicalRectangleObstacle('fromCorner', 460, 0, 40, 60, 'darkgreen'),
          this.createTypicalRectangleObstacle('fromCorner', 400, 60, 120, 60, 'darkgreen'),
          this.createTypicalRectangleObstacle('fromCorner', 420, 120, 120, 60, 'darkgreen'),
          this.createTypicalRectangleObstacle('fromCorner', 440, 180, 120, 60, 'darkgreen'),
          this.createTypicalRectangleObstacle('fromCorner', 400, 240, 120, 60, 'darkgreen'),
          this.createTypicalRectangleObstacle('fromCorner', 340, 120, 60, 60, 'skyblue'),
          this.createTypicalRectangleObstacle('fromCorner', 300, 180, 60, 60, 'skyblue'),
          this.createTypicalRectangleObstacle('fromCorner', 520, 480, 40, 60, 'green'),
          this.createTypicalRectangleObstacle('fromCorner', 60, 0, 60, 240, 'white'),
          this.createTypicalRectangleObstacle('fromCorner', 120, 0, 20, 60, 'teal'),
          this.createTypicalRectangleObstacle('fromCorner', 160, 0, 40, 180, 'orange'),
          this.createTypicalRectangleObstacle('fromCorner', 240, 0, 40, 120, 'orange'),
          this.createTypicalRectangleObstacle('fromCorner', 340, 0, 40, 60, 'orange'),
          this.createTypicalRectangleObstacle('fromCorner', 300, 60, 40, 60, 'orange'),
          this.createTypicalRectangleObstacle('fromCorner', 180, 180, 20, 60, 'brown'),
          this.createTypicalRectangleObstacle('fromCorner', 220, 240, 20, 60, 'green'),
          this.createTypicalRectangleObstacle('fromCorner', 200, 120, 40, 120, 'yellow'),
          this.createTypicalRectangleObstacle('fromCorner', 240, 180, 40, 60, 'coral'),
          this.createTypicalRectangleObstacle('fromCorner', 80, 240, 80, 240, 'white'),
          this.createTypicalRectangleObstacle('fromCorner', 160, 300, 20, 120, 'gray'),
          this.createTypicalRectangleObstacle('fromCorner', 240, 240, 80, 240, 'red'),
        ],
      });
    },
  ],
};