'use strict';

const normalLevelFactory = {
  createLevelNumber : function(n, respawnInfo) {
    return this.factories[n].call(this, respawnInfo);
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

  createTypicalKeyGuide : function(x, y) {
    return KeyGuide({
      wasdRadius : 40,
      arrowRadius : 70,
      fontFamily : 'mono',
      fontSize : 32,
      shape : Circle({
        x : x,
        y : y,
        r : 50,
      }),
    });
  },

  factories : [
    function(respawnInfo) {
      const rectObstacle = this.createTypicalRectangleObstacle.bind(this, 'fromCorner');
      return Level({
        respawnInfo : respawnInfo,
        player : this.createTypicalPlayer(200, 200),
        gameplayObjects : [
          this.createTypicalPlayerTrail(),
          this.createTypicalKeyGuide(200, 200),
          this.createTypicalBounds(600, 600),
          this.createTypicalCheckpoint(200, 200),
          this.createTypicalCheckpoint(250, 450),
          this.createTypicalGoal(450, 150),
          rectObstacle(0, 0, 100, 600, 'blue'),
          rectObstacle(500, 0, 100, 600, 'red'),
          rectObstacle(0, 0, 600, 100, 'green'),
          rectObstacle(0, 500, 600, 100, 'orange'),
          rectObstacle(300, 100, 100, 300, 'brown'),
          rectObstacle(100, 350, 200, 50, 'navy'),
          rectObstacle(400, 200, 100, 50, 'navy'),
          rectObstacle(350, 400, 50, 100, 'yellow'),
        ],
      });
    },

    function(respawnInfo) {
      const rectObstacle = this.createTypicalRectangleObstacle.bind(this, 'fromCorner');
      return Level({
        respawnInfo : respawnInfo,
        player : this.createTypicalPlayer(60, 540),
        gameplayObjects : [
          this.createTypicalPlayerTrail(),
          this.createTypicalBounds(600, 600),
          this.createTypicalCheckpoint(60, 540),
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

    function(respawnInfo) {
      const rectObstacle = this.createTypicalRectangleObstacle.bind(this, 'fromCorner');
      return Level({
        respawnInfo : respawnInfo,
        player : this.createTypicalPlayer(80, 30),
        gameplayObjects : [
          this.createTypicalPlayerTrail(),
          this.createTypicalBounds(600, 600),
          this.createTypicalCheckpoint(80, 30),
          this.createTypicalCheckpoint(250, 510),
          this.createTypicalCheckpoint(210, 330),
          this.createTypicalCheckpoint(290, 150),
          this.createTypicalGoal(560, 60),
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
          rectObstacle(60, 60, 40, 60, 'pink'),
          rectObstacle(60, 120, 60, 120, 'white'),
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