'use strict';

const LL = require('data-linked-list');
const GPU = require('role-gpu');

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
    //create list;
    let dataList = new LL();

    //loop over list of all rooms and create a node for each on dataList;

    //loop over rooms;
    for (var room in Game.rooms) {
      //variables
      let structListMine = Game.rooms[room].find(FIND_MY_STRUCTURES);
      let structListFoes = Game.rooms[room].find(FIND_HOSTILE_STRUCTURES);
      let hostileCreepCount = Game.rooms[room].find(FIND_HOSTILE_CREEPS).length;

      //template for room;
      let newRoom = {
        myStructures: structListMine,
        hostileStructures: structListFoes,
        hostileCreeps: hostileCreepCount,
        myCreeps: new LL(),
      };

      //find all creeps in room
      let creepList = Game.rooms[room].find(FIND_MY_CREEPS);

    }

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
