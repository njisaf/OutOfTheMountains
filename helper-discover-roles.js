'use strict';

module.exports = function() {

  //okay, let's start basic. If there are fewer than 5 GPUs, spawn a new GPU and assign them to harvesters
  //we want five GPUs as quick as possible. I'll need to stick this number somewhere else eventually;
  //for now also let's do this only if we have full energy.
  for (var room in Memory.creepsByRoom) {
    if (Memory.creepsByRoom[room].gpuNameArray.length < 5 && Game.rooms[room].energyAvailable === 300) {
      
    }
  }

};
