'use strict';

const message = document.getElementById('gameMessage');
const next = document.getElementById('gameNext');
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

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