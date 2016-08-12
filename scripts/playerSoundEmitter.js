'use strict';

function PlayerSoundEmitter(args) {
  if(!(this instanceof PlayerSoundEmitter))
    return new PlayerSoundEmitter(args);

  this.audioContext = args.audioContext;
  this.playedStartSound = false;
}

PlayerSoundEmitter.prototype = GameplayObject();

PlayerSoundEmitter.prototype.draw = function() {}

PlayerSoundEmitter.prototype.beginObservingPlayer = function(player) {
  player.addMovementObserver(this);
  player.addWarpObserver(this);
}

PlayerSoundEmitter.prototype.afterPlayerMoved = function(player) {
  if(!this.playedStartSound) {
    alert('*start sound*');
    this.playedStartSound = true;
  }
}

PlayerSoundEmitter.prototype.afterPlayerWarped = function(player) {
  alert('*warp sound*');
}