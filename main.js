'use strict';

const dataList = require('helper-datalist');

const GPU = require('role-gpu');

module.exports.loop = function() {

  //clear dead creeps from memory
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory: ', name);
    }
  }

  //detect if there is a datalist in memory, and if not create one containing all rooms.
  if(!Memory.dataList) {
    dataList.generate();
  } else {
    //TESTING: update is currently just generating a new datalist, what will this do?
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
