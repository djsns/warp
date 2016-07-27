'use strict';

function Banner(args) {
  if(!(this instanceof Banner))
    return new Banner(args);

  this.message = args.message;
  this.next = args.next;
  this.retry = args.retry;
  this.reset();
}

Banner.prototype.reportVictory = function() {
  this.printMessage('You won, next level:');
  this.hideElement(this.retry);
  this.showElement(this.next);
  this.next.focus();
}

Banner.prototype.reportFailure = function() {
  this.printMessage('how could you ;_;');
  this.hideElement(this.next);
  this.showElement(this.retry);
}

Banner.prototype.reset = function() {
  this.printMessage('WARP');
  this.hideElement(this.next);
  this.hideElement(this.retry);
}

Banner.prototype.printMessage = function(message) {
  this.message.textContent = message;
}

Banner.prototype.showElement = function(element) {
  element.classList.remove('hidden');
}

Banner.prototype.hideElement = function(element) {
  element.classList.add('hidden');
}