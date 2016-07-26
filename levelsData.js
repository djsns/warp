'use strict';

let levelsData = [
() => {
  return Level({
    player : Player({
      shape : Circle({
        x : 300,
        y : 300,
        r : 10,
        style : '#FFFFFF',
        filled : true,
      }),
    }),
    playerTrail : PlayerTrail({
      lineWidth : 2,
      smoothness : 8,
      style : '#AAAAAA',
    }),
    obstacles : [
      Obstacle({
        shape : Rectangle({
          x : 0,
          y : 0,
          width : 600,
          height : 200,
          style : '#444444',
        }),
      }),
    ],
    goal : Goal({
      shape : Circle({
        x : 500,
        y : 500,
        r : 30,
        style : '#FFFFFF',
        filled : false,
      }),
    }),
  });
}];