'use strict';

function PlayerSoundEmitter(args) {
  if(!(this instanceof PlayerSoundEmitter))
    return new PlayerSoundEmitter(args);

  this.audioContext = args.audioContext;

  this.startAudioElement = args.startAudioElement;
  this.startAudioNode = this.audioContext.createMediaElementSource(this.startAudioElement);
  this.startAudioNode.connect(this.audioContext.destination);

  this.warpAudioElement = args.warpAudioElement;
  this.warpAudioNode = this.audioContext.createMediaElementSource(this.warpAudioElement);
  this.warpAudioNode.connect(this.audioContext.destination);

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
    this.startAudioElement.play();
    this.playedStartSound = true;
  }
}

PlayerSoundEmitter.prototype.afterPlayerWarped = function(player) {
  this.warpAudioElement.play();
}