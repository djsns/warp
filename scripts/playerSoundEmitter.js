'use strict';

function PlayerSoundEmitter(args) {
  if(!(this instanceof PlayerSoundEmitter))
    return new PlayerSoundEmitter(args);

  this.audioContext = args.audioContext;
  this.startAudioBufferPromise = args.startAudioBufferPromise;
  this.warpAudioBufferPromise = args.warpAudioBufferPromise;
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
  return this.startAudioBufferPromise.then(startAudioBuffer => {
    const startSoundNode = this.audioContext.createBufferSource();
    startSoundNode.buffer = startAudioBuffer;
    startSoundNode.connect(this.audioContext.destination);
    startSoundNode.start();
  });
}

PlayerSoundEmitter.prototype.playWarpSound = function(soundName) {
  return this.warpAudioBufferPromise.then(warpAudioBuffer => {
    const warpSoundNode = this.audioContext.createBufferSource();
    warpSoundNode.buffer = warpAudioBuffer;
    warpSoundNode.detune.value = Math.random()*400 - 100;
    warpSoundNode.connect(this.audioContext.destination);
    warpSoundNode.start();
  });
}