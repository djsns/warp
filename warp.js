'use strict';

const banner = Banner({
  message : document.getElementById('gameMessage'),
  next : document.getElementById('gameNext'),
  retry : document.getElementById('gameRetry'),
});

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const level = levelFactory.createLevelNumber(2);
const controller = Controller(level.player, level);

level.addResultListener(result => {
  if(result)
    banner.reportVictory();
  else banner.reportFailure();
});

level.startGameLoop(context);