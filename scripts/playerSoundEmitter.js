'use strict';

function PlayerSoundEmitter(args) {
  if(!(this instanceof PlayerSoundEmitter))
    return new PlayerSoundEmitter(args);

  this.audioContext = args.audioContext;
  this.startAudioBuffer = args.startAudioBuffer;
  this.warpAudioBuffer = args.warpAudioBuffer;
  this.playedStartSound = false;
}

PlayerSoundEmitter.prototype = GameplayObject();

PlayerSoundEmitter.prototype.draw = function() {}

PlayerSoundEmitter.prototype.beginObservingPlayer = function(player) {
  player.addMovementObserver(this);
  player.addWarpObserver(this);
}

PlayerSoundEmitter.prototype.afterPlayerMoved = function() {
  if(!this.playedStartSound) {
    this.playStartSound();
    this.playedStartSound = true;
  }
}

PlayerSoundEmitter.prototype.afterPlayerWarped = function() {
  this.playWarpSound();
}

PlayerSoundEmitter.prototype.playStartSound = function(soundName) {
  const startSoundNode = this.audioContext.createBufferSource();
  startSoundNode.buffer = this.startAudioBuffer;
  startSoundNode.connect(this.audioContext.destination);
  startSoundNode.start();
}

PlayerSoundEmitter.prototype.playWarpSound = function(soundName) {
  const warpSoundNode = this.audioContext.createBufferSource();
  warpSoundNode.buffer = this.warpAudioBuffer;
  warpSoundNode.connect(this.audioContext.destination);
  warpSoundNode.start();
}