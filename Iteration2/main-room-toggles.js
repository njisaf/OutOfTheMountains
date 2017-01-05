'use strict';

module.exports = function() {

  let gpuNameArray = Memory.rooms[room].gpuNameArray;
  let constructionSites = Memory.rooms[room].constructionSites;
  let energyAvailable = Game.rooms[room].energyAvailable;

  for (var room in Memory.rooms) {

    //stage 1, get to five GPUs;
    if(gpuNameArray.length < Memory.gpuSetupCount &&
        energyAvailable === 300) {
      Memory.rooms[room].toggles.setupStage = 1;
    }

    //stage 2, build anything around;
    if(gpuNameArray.length >= Memory.gpuSetupCount &&
        energyAvailable === 300 &&
          constructionSites.length) {
      Memory.rooms[room].toggles.setupStage = 2;
    }

    //stage 3, upgrade if there's nothing to be building;
    if(gpuNameArray.length >= Memory.gpuSetupCount &&
        energyAvailable === 300 &&
          !constructionSites.length) {
      Memory.rooms[room].toggles.setupStage = 3;
    }
  }

};
