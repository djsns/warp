'use strict';

const context = document.getElementById('gameCanvas').getContext('2d');

const game = Game({
  banner : Banner({
    message : document.getElementById('gameMessage'),
    next : document.getElementById('gameNext'),
    retry : document.getElementById('gameRetry'),
  }),
  levelFactory : NormalLevelFactory(),
})

document.getElementById('gameNext').addEventListener('click', () =>
  game.startNextLevel());
document.getElementById('gameRetry').addEventListener('click', () =>
  game.startCurrentLevel());

game.startCurrentLevel();