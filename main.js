'use strict';

const helperMemory = require('helper-memory');
const helperDiscoverRoles = require('helper-discover-roles');

const modelGPU = require('model-gpu');

module.exports.loop = function() {

  //clear dead creeps from memory
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory: ', name);
    }
  }

  //update data pulls;
  helperMemory.update();

  //update tribeArray on room Memory objects.
  helperDiscoverRoles();

  //reassign roles based on tribe array;

  //execute roles for all creeps
  for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];

    if(creep.memory.model === 'GPU') {
      if(creep.memory.role === 'harvester') {
        modelGPU.harvester(creep);
      }
      if(creep.memory.role === 'upgrader') {
        modelGPU.upgrader(creep);
      }
      if(creep.memory.role === 'builder') {
        modelGPU.builder(creep);
      }
    }

  }

};

// Game.spawns['The Base'].createCreep([WORK, CARRY, MOVE], undefined, {model: 'GPU', role: 'harvester', base: 'The Base'});
