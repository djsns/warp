'use strict';

let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');

let level = Level(levelsData[0]);
let controller = Controller(level.circle);

function frame(now) {
  level.frame(context, now);
  if(level.isLost())
    alert('ded');
  else if(level.isWon())
    alert('won');
  else window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);