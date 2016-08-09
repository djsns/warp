'use strict';

const prerenderContext = document.getElementById('gameBackgroundCanvas').getContext('2d');
const context = document.getElementById('gameCanvas').getContext('2d');

const game = Game({
  banner : Banner({
    message : document.getElementById('gameMessage'),
    next : document.getElementById('gameNext'),
    retry : document.getElementById('gameRetry'),
  }),
  levelFactory : normalLevelFactory,
})

document.getElementById('gameNext').addEventListener('click', () =>
  game.startNextLevel());
document.getElementById('gameRetry').addEventListener('click', () =>
  game.startCurrentLevel());

game.startCurrentLevel();