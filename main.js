'use strict';

// const ll = require('data-linked-list');
const GPU = require('role-gpu');

module.exports.loop = function() {

  //clear dead creeps from memory
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory: ', name);
    }
  }

  //execute roles for all creeps
  for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];
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

};
