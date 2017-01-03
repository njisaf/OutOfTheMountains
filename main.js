'use strict';

const buildMemory = require('helper-build-memory');
const discoverRoles = require('helper-discover-roles');

const modelGPU = require('model-gpu');

module.exports.loop = function() {

  //update data pulls;
  buildMemory.scaffold();
  buildMemory.globalToggles();
  buildMemory.clausewitz();
  buildMemory.clean();

  //update tribeArray on room Memory objects.
  discoverRoles();

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
