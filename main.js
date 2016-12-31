'use strict';

// const LL = require('data-linked-list');
const GPU = require('role-gpu');
const dataList = require('helper-datalist');

module.exports.loop = function() {

  //clear dead creeps from memory
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory: ', name);
    }
  }

  //detect if there is a linked list in memory, and if not create one containing all rooms.
  if(!Memory.dataList) {
    dataList.generate();
  } else {
    dataList.update();
  }

  //execute roles for all creeps
  for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];

    if(creep.memory.model === 'GPU') {
      if(creep.memory.role === 'harvester') {
        GPU.harvester(creep);
      }
      if(creep.memory.role === 'upgrader') {
        GPU.upgrader(creep);
      }
      if(creep.memory.role === 'builder') {
        GPU.builder(creep);
      }
    }

  }

};

// Game.spawns['The Base'].createCreep([WORK, CARRY, MOVE], undefined, {model: 'GPU', role: 'harvester', base: 'The Base'});
