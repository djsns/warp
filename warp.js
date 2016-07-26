'use strict';

let message = document.getElementById('gameMessage');
let next = document.getElementById('gameNext');
let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');

let level = levelFactory.createLevelNumber(1);
let controller = Controller(level.player);

level.gameLoop(context, result => {
  controller.detach();
  if(result) {
    message.textContent = 'You won, next level:';
    next.classList.remove('hidden');
    next.focus();
  } else {
    message.textContent = 'how could you ;_;';
  }
});