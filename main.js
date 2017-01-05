'use strict';

const buildMemory = require('main-build-memory');
const setCreepRoles = require('main-set-creep-roles');

const modelGPU = require('model-gpu');

module.exports.loop = function() {

  //update data pulls;
  buildMemory.scaffold();
  buildMemory.globalToggles();
  buildMemory.rooms();
  buildMemory.clean();

  //update tribeArray on room Memory objects.
  setCreepRoles();

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
