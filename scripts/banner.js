'use strict';

function Banner(args) {
  if(!(this instanceof Banner))
    return new Banner(args);

  this.message = args.message;
  this.next = args.next;
  this.retry = args.retry;
  this.levelNumber = 0;
  this.victoryMessages = [['You won, next level:'], ['Some progress.', 'That was okay.'], ['How quick. <- joke', 'Wooow, finally.']];
  this.failureMessages = [["It won't get easier."], ['Disappointing.', 'The first real failure.', 'Embarrassed yet?'], ['Once more?']];
}

Banner.prototype.listenToLevel = function(level) {
  level.addOutcomeListener(outcome => {
    if(outcome)
      this.reportVictory();
    else this.reportFailure();
  });
}

Banner.prototype.reportVictory = function() {
  const possibilities = this.victoryMessages[this.levelNumber];
  this.printMessage(mathUtils.randomArrayElement(possibilities));
  this.hideElement(this.retry);
  this.showElement(this.next);
}

Banner.prototype.reportFailure = function() {
  const possibilities = this.failureMessages[this.levelNumber];
  this.printMessage(mathUtils.randomArrayElement(possibilities));
  this.hideElement(this.next);
  this.showElement(this.retry);
}

Banner.prototype.resetForLevel = function(levelNumber) {
  this.levelNumber = levelNumber;
  this.printMessage('WARP');
  this.hideElement(this.next);
  this.hideElement(this.retry);
}

Banner.prototype.printMessage = function(message) {
  this.message.textContent = message;
}

Banner.prototype.showElement = function(element) {
  element.hidden = false;
  element.focus();
}

Banner.prototype.hideElement = function(element) {
  element.hidden = true;
  element.blur();
}