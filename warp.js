'use strict';

const message = document.getElementById('gameMessage');
const next = document.getElementById('gameNext');
const retry = document.getElementById('gameRetry');
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const banner = Banner({
  message : message,
  next : next,
  retry : retry,
});

const level = levelFactory.createLevelNumber(1);
const controller = Controller(level.player, level);

level.addResultListener(result => {
  if(result)
    banner.reportVictory();
  else banner.reportFailure();
});

level.startGameLoop(context);