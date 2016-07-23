'use strict';

let levelsData = [
{
  player : {
    shape : {
      type : 'circle',
      x : 300,
      y : 300,
      r : 10,
      style : '#FFFFFF',
    },
    trail : {
      lineWidth : 2,
      smoothness : 8
    }
  },
  obstacles : [
    {
      shape : {
        type : 'rectangle',
        x : 0,
        y : 0,
        width : 800,
        height : 200,
        style : '#444444'
      }
    }
  ],
  goal : {
    shape : {
      type : 'circle',
      x : 500,
      y : 500,
      r : 30,
      lineWidth : 1,
      style : '#FFFFFF'
    }
  }
}];