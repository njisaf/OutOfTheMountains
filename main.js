'use strict';

// const LL = require('data-linked-list');
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
    let dataList = {
      myRooms: {},
    };
    Memory.dataList = dataList;

    //loop over list of all rooms and create a node for each on dataList;

    //loop over rooms;
    for (var room in Game.rooms) {
      //find things in room
      let structListMine = Game.rooms[room].find(FIND_MY_STRUCTURES);
      let structListFoesCount = Game.rooms[room].find(FIND_HOSTILE_STRUCTURES).length;
      let hostileCreepCount = Game.rooms[room].find(FIND_HOSTILE_CREEPS).length;
      let creepList = Game.rooms[room].find(FIND_MY_CREEPS);

      //build structure objects from list;
      let myStructuresObj = {};

      for (var i = 0; i < structListMine.length; ++i) {
        let structLate = {
          position: structListMine[i].pos,
          id: structListMine[i].id,
        };
        myStructuresObj[structListMine[i].structureType] = structLate;
      }

      //template for room;
      let newRoom = {
        hostileStructuresCount: structListFoesCount,
        hostileCreepsCount: hostileCreepCount,
        myStructures: myStructuresObj,
        myCreeps: [],
      };

      //add creeps to array;
      for (var myCreep in creepList) {
        //creep template, or 'creepLate' eh?
        let creepLate = {
          name: Game.creeps[myCreep],
          model: Game.creeps[myCreep].model,
          role: Game.creeps[myCreep].role,
          base: Game.creeps[myCreep].base,
        };

        newRoom.myCreeps.push(creepLate);
      }
      //stick the room template on dataList
      console.log('newRoom: ', newRoom);
      Memory.dataList.myRooms[room] = newRoom;
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
