'use strict';

let message = document.getElementById('gameMessage');
let next = document.getElementById('gameNext');
let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');

let level = Level(levelsData[0]);
let controller = Controller(level.circle);

level.gameLoop(context, result => {
  if(result) {
    message.textContent = 'You won, next level:';
    next.classList.remove('hidden');
  } else {
    message.textContent = 'how could you ;_;';
  }
});