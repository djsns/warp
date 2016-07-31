'use strict';

const context = document.getElementById('gameCanvas').getContext('2d');

const game = {
  startCurrentLevel : function() {
    this.banner.reset();

    const level = levelFactory.createLevelNumber(this.currentLevelNumber);
    const controller = Controller(level.player, level);

    level.addResultListener(result => {
      if(result)
        this.banner.reportVictory();
      else this.banner.reportFailure();
    });

    level.startGameLoop(context);
  },

  startNextLevel : function() {
    ++this.currentLevelNumber;
    this.startCurrentLevel();
  },

  currentLevelNumber : 0,

  banner : Banner({
    message : document.getElementById('gameMessage'),
    next : document.getElementById('gameNext'),
    retry : document.getElementById('gameRetry'),
  }),
};

document.getElementById('gameNext').addEventListener('click', () =>
  game.startNextLevel());
document.getElementById('gameRetry').addEventListener('click', () =>
  game.startCurrentLevel());

game.startCurrentLevel();