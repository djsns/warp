'use strict';

function Banner(args) {
  if(!(this instanceof Banner))
    return new Banner(args);

  this.message = args.message;
  this.next = args.next;
  this.retry = args.retry;
}

Banner.prototype.listenToLevel = function(level) {
  level.addOutcomeListener(outcome => {
    if(outcome)
      this.reportVictory();
    else this.reportFailure();
  });
  level.addFinalMessageListener(finalMessage => {
    this.printMessage(finalMessage);
  });
}

Banner.prototype.listenToLastLevel = function(level) {
  level.addFinalMessageListener(finalMessage => {
    this.printMessage(finalMessage);
    this.showBareMessage();
  });
}

Banner.prototype.reportVictory = function() {
  this.hideElement(this.retry);
  this.showElement(this.next);
}

Banner.prototype.reportFailure = function() {
  this.hideElement(this.next);
  this.showElement(this.retry);
}

Banner.prototype.showBareMessage = function() {
  this.hideElement(this.next);
  this.hideElement(this.retry);
}

Banner.prototype.reset = function() {
  this.printMessage('WARP');
  this.showBareMessage();
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