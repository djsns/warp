'use strict';

function NormalLevelFactory(context, audioContext) {
  if(!(this instanceof NormalLevelFactory))
    return new NormalLevelFactory(context, audioContext);
  this.isDuringDevelopment = false;
  this.context = context;
  this.audioContext = audioContext;
  this.startAudioBufferPromise = this.loadAudioBuffer('sounds/lunardrive_drip.wav');
  this.warpAudioBufferPromise = this.loadAudioBuffer('sounds/univ-lyon3_cannet.wav')
}

NormalLevelFactory.prototype.loadAudioBuffer = function(bufferPath) {
  return new Promise((fulfill, reject) => {
    const request = new XMLHttpRequest;
    request.open('GET', bufferPath);
    request.responseType = 'arraybuffer';
    request.onload = () => fulfill(this.audioContext.decodeAudioData(request.response));
    request.onerror = () => reject(Error('status: '+request.status));
    request.send();
  });
}

NormalLevelFactory.prototype.createLevelNumber = function(n, respawnInfo) {
  const levelArgFactory = NormalLevelFactory.levelArgFactories[n];
  if(!levelArgFactory)
    return null;
  const levelArgs = levelArgFactory.call(this);
  levelArgs.respawnInfo = respawnInfo;
  const startCheckpoint =
    this.createTypicalCheckpoint(levelArgs.player.x, levelArgs.player.y);
  levelArgs.gameplayObjects.push(startCheckpoint);
  const playerSoundEmitter = this.createTypicalPlayerSoundEmitter();
  levelArgs.gameplayObjects.push(playerSoundEmitter);
  levelArgs.context = this.context;
  return Level(levelArgs);
}

NormalLevelFactory.prototype.createTypicalPlayer = function(x, y) {
  return Player({
    shape : Circle({
      x : x,
      y : y,
      r : 10,
      style : '#FFF',
      filled : true,
    }),
  });
}

NormalLevelFactory.prototype.createTypicalPlayerTrail = function() {
  return PlayerTrail({
    lineWidth : 2,
    smoothness : 8,
    style : '#444',
  });
}

NormalLevelFactory.prototype.createTypicalGoal = function(x, y) {
  return Goal({
    shape : Circle({
      x : x,
      y : y,
      r : 30,
      style : '#FFF',
      filled : false,
    }),
  });
}

NormalLevelFactory.prototype.createTypicalRectangleObstacle =
function(method, x, y, width, height, style) {
  return Obstacle({
    shape : Rectangle[method]({
      x : x,
      y : y,
      width : width,
      height : height,
      style : (this.isDuringDevelopment && style) || '#444',
    }),
  });
}

NormalLevelFactory.prototype.createTypicalBounds = function(width, height) {
  return Bounds({
    shape : Rectangle.fromCorner({
      x : 0,
      y : 0,
      width : width,
      height : height,
      style : 'transparent',
    }),
  });
}

NormalLevelFactory.prototype.createTypicalCheckpoint = function(x, y) {
  return Checkpoint({
    shape : Circle({
      x : x,
      y : y,
      r : 20,
    }),
    activeStyle : '#FFF',
    achievedStyle : '#444',
  });
}

NormalLevelFactory.prototype.createTypicalKeyGuide = function(x, y) {
  return KeyGuide({
    wasdRadius : 40,
    arrowRadius : 70,
    style : 'white',
    fontFamily : 'mono',
    fontSize : 32,
    shape : Circle({
      x : x,
      y : y,
      r : 50,
    }),
  });
}

NormalLevelFactory.prototype.createTypicalRectangleMovementGuide =
function(text, textX, textY, x, y, width, height) {
  return MovementGuide({
    text : text,
    textX : textX,
    textY : textY,
    style : 'white',
    fontFamily : 'mono',
    fontSize : 32,
    shape : Rectangle.fromCorner({
      x : x,
      y : y,
      width : width,
      height : height,
    }),
  });
}

NormalLevelFactory.prototype.createTypicalCircleMovementGuide =
function(text, textX, textY, x, y, r) {
  return MovementGuide({
    text : text,
    textX : textX,
    textY : textY,
    style : 'white',
    fontFamily : 'mono',
    fontSize : 32,
    shape : Circle({
      x : x,
      y : y,
      r : r,
    }),
  });
}

NormalLevelFactory.prototype.createTypicalPlayerSoundEmitter = function() {
  return PlayerSoundEmitter({
    audioContext : this.audioContext,
    startAudioBufferPromise : this.startAudioBufferPromise,
    warpAudioBufferPromise : this.warpAudioBufferPromise,
  });
}

NormalLevelFactory.prototype.rectObstacle = function(cornerX, cornerY, width, height, style) {
  return this.createTypicalRectangleObstacle('fromCorner', cornerX, cornerY,
                                             width, height, style);
}

NormalLevelFactory.prototype.getLevelCount = function() {
  return NormalLevelFactory.levelArgFactories.length;
}

NormalLevelFactory.levelArgFactories = [
  function() {
    return {
      victoryMessages : ['You won, next level:'],
      failureMessages : ['Everyone does that.', "I'm out of tips.", 'Can we continue?'],
      player : this.createTypicalPlayer(200, 200),
      gameplayObjects : [
        this.createTypicalPlayerTrail(),
        this.createTypicalKeyGuide(200, 200),
        this.createTypicalRectangleMovementGuide('↓', 200, 302, 100, 400, 250, 100),
        this.createTypicalRectangleMovementGuide('↓', 200, 334, 100, 400, 250, 100),
        this.createTypicalRectangleMovementGuide('↓', 232, 334, 100, 400, 250, 100),
        this.createTypicalRectangleMovementGuide('↓', 168, 334, 100, 400, 250, 100),
        this.createTypicalCircleMovementGuide('→', 200, 450, 250, 450, 20),
        this.createTypicalRectangleMovementGuide('↑', 450, 300, 400, 100, 100, 100),
        this.createTypicalRectangleMovementGuide('↑', 450, 268, 400, 100, 100, 100),
        this.createTypicalBounds(600, 600),
        this.createTypicalCheckpoint(250, 450),
        this.createTypicalGoal(450, 150),
        this.rectObstacle(0, 0, 100, 600, 'blue'),
        this.rectObstacle(500, 0, 100, 600, 'red'),
        this.rectObstacle(0, 0, 600, 100, 'green'),
        this.rectObstacle(0, 500, 600, 100, 'orange'),
        this.rectObstacle(300, 100, 100, 300, 'brown'),
        this.rectObstacle(100, 350, 200, 50, 'navy'),
        this.rectObstacle(400, 200, 100, 50, 'teal'),
        this.rectObstacle(350, 400, 50, 100, 'yellow'),
      ],
    };
  },

  function() {
    return {
      victoryMessages :  ['Some progress.', 'That was okay.'],
      failureMessages : ['Give yourself a while.', 'Ever closer.'],
      player : this.createTypicalPlayer(60, 540),
      gameplayObjects : [
        this.createTypicalPlayerTrail(),
        this.createTypicalBounds(600, 600),
        this.createTypicalCheckpoint(37.5, 270),
        this.createTypicalCheckpoint(327.5, 60),
        this.createTypicalGoal(525, 60),
        this.rectObstacle(75, 0, 70, 120, 'blue'),
        this.rectObstacle(205, 0, 70, 120, 'green'),
        this.rectObstacle(380, 0, 70, 120, 'yellow'),
        this.rectObstacle(75, 120, 450, 120, 'orange'),
        this.rectObstacle(450, 240, 75, 120, 'red'),
        this.rectObstacle(575, 120, 25, 240, 'magenta'),
        this.rectObstacle(550, 120, 25, 120, 'purple'),
        this.rectObstacle(0, 300, 450, 60, 'gray'),
        this.rectObstacle(0, 360, 200, 120, 'indianred'),
        this.rectObstacle(400, 360, 200, 120, 'pink'),
      ],
    };
  },

  function() {
    return {
      victoryMessages : ['Took you long enough.', 'Well, finally.'],
      failureMessages :  ['Once more?'],
      player : this.createTypicalPlayer(80, 30),
      gameplayObjects : [
        this.createTypicalPlayerTrail(),
        this.createTypicalBounds(600, 600),
        this.createTypicalCheckpoint(250, 510),
        this.createTypicalCheckpoint(210, 330),
        this.createTypicalCheckpoint(290, 150),
        this.createTypicalGoal(560, 60),
        this.rectObstacle(0, 120, 20, 60, 'blue'),
        this.rectObstacle(40, 180, 20, 120, 'yellow'),
        this.rectObstacle(20, 300, 40, 60, 'blue'),
        this.rectObstacle(40, 360, 40, 60, 'blue'),
        this.rectObstacle(20, 420, 40, 60, 'blue'),
        this.rectObstacle(0, 480, 20, 120, 'orange'),
        this.rectObstacle(40, 540, 40, 60, 'yellow'),
        this.rectObstacle(80, 480, 40, 60, 'teal'),
        this.rectObstacle(120, 540, 120, 60, 'purple'),
        this.rectObstacle(280, 540, 120, 60, 'purple'),
        this.rectObstacle(440, 540, 120, 60, 'purple'),
        this.rectObstacle(180, 480, 40, 60, 'chartreuse'),
        this.rectObstacle(280, 480, 40, 60, 'chartreuse'),
        this.rectObstacle(320, 300, 40, 180, 'navy'),
        this.rectObstacle(360, 360, 40, 120, 'navy'),
        this.rectObstacle(400, 420, 40, 120, 'navy'),
        this.rectObstacle(440, 360, 80, 120, 'navy'),
        this.rectObstacle(520, 420, 20, 60, 'indianred'),
        this.rectObstacle(520, 360, 40, 60, 'indianred'),
        this.rectObstacle(540, 300, 40, 60, 'indianred'),
        this.rectObstacle(560, 240, 40, 60, 'indianred'),
        this.rectObstacle(460, 0, 40, 60, 'darkgreen'),
        this.rectObstacle(400, 60, 120, 60, 'darkgreen'),
        this.rectObstacle(420, 120, 120, 60, 'darkgreen'),
        this.rectObstacle(440, 180, 120, 60, 'darkgreen'),
        this.rectObstacle(400, 240, 120, 60, 'darkgreen'),
        this.rectObstacle(340, 120, 60, 60, 'skyblue'),
        this.rectObstacle(300, 180, 60, 60, 'skyblue'),
        this.rectObstacle(520, 480, 40, 60, 'green'),
        this.rectObstacle(60, 60, 40, 60, 'pink'),
        this.rectObstacle(60, 120, 60, 120, 'white'),
        this.rectObstacle(160, 0, 40, 180, 'orange'),
        this.rectObstacle(240, 0, 40, 120, 'orange'),
        this.rectObstacle(340, 0, 40, 60, 'orange'),
        this.rectObstacle(300, 60, 40, 60, 'orange'),
        this.rectObstacle(180, 180, 20, 60, 'brown'),
        this.rectObstacle(220, 240, 20, 60, 'green'),
        this.rectObstacle(200, 120, 40, 120, 'yellow'),
        this.rectObstacle(240, 180, 40, 60, 'coral'),
        this.rectObstacle(80, 240, 80, 240, 'white'),
        this.rectObstacle(160, 300, 20, 120, 'gray'),
        this.rectObstacle(240, 240, 80, 240, 'red'),
      ],
    };
  },
  function() {
    return {
      victoryMessages : ["That's all."],
      failureMessages : ['This is impossible.'],
      player : this.createTypicalPlayer(300, 300),
      gameplayObjects : [
        this.createTypicalGoal(300, 300),
      ],
    };
  },
]