'use strict';

const normalLevelFactory = {
  createLevelNumber : function(n) {
    return this.factories[n].call(this);
  },

  createLevelWithCustomPlayerPosition : function(n, customPlayerPosition) {
    return this.factories[n].call(this, customPlayerPosition);
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

  customizablyCreateTypicalPlayer : function(defaultX, defaultY, customPosition) {
    if(customPosition)
      return this.createTypicalPlayer(customPosition.x, customPosition.y);
    else return this.createTypicalPlayer(defaultX, defaultY);
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
        style : (this.isDuringDevelopment && style) || '#444444',
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

  createTypicalCheckpoint : function(x, y) {
    return Checkpoint({
      shape : Circle({
        x : x,
        y : y,
        r : 20,
      }),
      activeStyle : '#FFFFFF',
      achievedStyle : '#444444',
    });
  },

  factories : [
    function(customPlayerPosition) {
      return Level({
        player : this.customizablyCreateTypicalPlayer(300, 300, customPlayerPosition),
        playerTrail : this.createTypicalPlayerTrail(),
        gameplayObjects : [
          this.createTypicalBounds(600, 600),
          this.createTypicalCheckpoint(200, 300),
          this.createTypicalCheckpoint(200, 400),
          this.createTypicalGoal(500, 500),
          this.createTypicalRectangleObstacle('fromCorner', 0, 0, 600, 200),
        ],
      });
    },

    function(customPlayerPosition) {
      const rectObstacle = this.createTypicalRectangleObstacle.bind(this, 'fromCorner');
      return Level({
        player : this.customizablyCreateTypicalPlayer(60, 540, customPlayerPosition),
        playerTrail : this.createTypicalPlayerTrail(),
        gameplayObjects : [
          this.createTypicalBounds(600, 600),
          this.createTypicalGoal(525, 60),
          rectObstacle(75, 0, 70, 120),
          rectObstacle(205, 0, 70, 120),
          rectObstacle(380, 0, 70, 120),
          rectObstacle(75, 120, 450, 120),
          rectObstacle(450, 240, 75, 120),
          rectObstacle(575, 120, 25, 240),
          rectObstacle(550, 120, 25, 120),
          rectObstacle(0, 300, 450, 60),
          rectObstacle(0, 360, 200, 120),
          rectObstacle(400, 360, 200, 120),
        ],
      });
    },

    function(customPlayerPosition) {
      const rectObstacle = this.createTypicalRectangleObstacle.bind(this, 'fromCorner');
      return Level({
        player : this.createTypicalPlayer(40, 30),
        player : this.customizablyCreateTypicalPlayer(40, 30, customPlayerPosition),
        playerTrail : this.createTypicalPlayerTrail(),
        gameplayObjects : [
          this.createTypicalBounds(600, 600),
          this.createTypicalGoal(560, 60),
          rectObstacle(0, 0, 20, 60, 'blue'),
          rectObstacle(0, 120, 20, 60, 'blue'),
          rectObstacle(40, 180, 20, 120, 'yellow'),
          rectObstacle(20, 300, 40, 60, 'blue'),
          rectObstacle(40, 360, 40, 60, 'blue'),
          rectObstacle(20, 420, 40, 60, 'blue'),
          rectObstacle(0, 480, 20, 120, 'orange'),
          rectObstacle(40, 540, 40, 60, 'yellow'),
          rectObstacle(80, 480, 40, 60, 'teal'),
          rectObstacle(120, 540, 120, 60, 'purple'),
          rectObstacle(280, 540, 120, 60, 'purple'),
          rectObstacle(440, 540, 120, 60, 'purple'),
          rectObstacle(180, 480, 40, 60, 'chartreuse'),
          rectObstacle(280, 480, 40, 60, 'chartreuse'),
          rectObstacle(320, 300, 40, 180, 'navy'),
          rectObstacle(360, 360, 40, 120, 'navy'),
          rectObstacle(400, 420, 40, 120, 'navy'),
          rectObstacle(440, 360, 80, 120, 'navy'),
          rectObstacle(520, 420, 20, 60, 'indianred'),
          rectObstacle(520, 360, 40, 60, 'indianred'),
          rectObstacle(540, 300, 40, 60, 'indianred'),
          rectObstacle(560, 240, 40, 60, 'indianred'),
          rectObstacle(460, 0, 40, 60, 'darkgreen'),
          rectObstacle(400, 60, 120, 60, 'darkgreen'),
          rectObstacle(420, 120, 120, 60, 'darkgreen'),
          rectObstacle(440, 180, 120, 60, 'darkgreen'),
          rectObstacle(400, 240, 120, 60, 'darkgreen'),
          rectObstacle(340, 120, 60, 60, 'skyblue'),
          rectObstacle(300, 180, 60, 60, 'skyblue'),
          rectObstacle(520, 480, 40, 60, 'green'),
          rectObstacle(60, 0, 60, 240, 'white'),
          rectObstacle(120, 0, 20, 60, 'teal'),
          rectObstacle(160, 0, 40, 180, 'orange'),
          rectObstacle(240, 0, 40, 120, 'orange'),
          rectObstacle(340, 0, 40, 60, 'orange'),
          rectObstacle(300, 60, 40, 60, 'orange'),
          rectObstacle(180, 180, 20, 60, 'brown'),
          rectObstacle(220, 240, 20, 60, 'green'),
          rectObstacle(200, 120, 40, 120, 'yellow'),
          rectObstacle(240, 180, 40, 60, 'coral'),
          rectObstacle(80, 240, 80, 240, 'white'),
          rectObstacle(160, 300, 20, 120, 'gray'),
          rectObstacle(240, 240, 80, 240, 'red'),
        ],
      });
    },
  ],

  isDuringDevelopment : false,
};