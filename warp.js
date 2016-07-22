'use strict';

let message = document.getElementById('gameMessage');
let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');

let level = Level(levelsData[0]);
let controller = Controller(level.circle);

function frame(now) {
  level.frame(context, now);
  if(level.isLost())
    message.textContent = 'ded';
  else if(level.isWon())
    message.textContent = 'won';
  else window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);