'use strict';

let message = document.getElementById('gameMessage');
let next = document.getElementById('gameNext');
let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');

let level = Level(levelsData[0]);
let controller = Controller(level.circle);

function frame(now) {
  level.frame(context, now);
  if(level.isLost()) {
    message.textContent = 'how could you ;_;';
  } else if(level.isWon()) {
    message.textContent = 'You won, next level:';
    next.classList.remove('hidden');
  } else {
    window.requestAnimationFrame(frame);
  }
}

window.requestAnimationFrame(frame);