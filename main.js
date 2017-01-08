'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

const determineSpawn = require('helper-determine-spawn');
const spawnCreep = require('helper-spawn-creep');

const roomModel = require('datum-room-model');

// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  Memory.datums = {};
  Memory.rooms = {};
  Memory.datums.globalEnergyAvailable = 0;
  Memory.datums.globalEnergyCapacityAvailable = 0;
  //build all stats; Do that first. We'll reformat later if we really need to.
  for (var _room in Game.rooms) {
    let room = Game.rooms[_room];
    Memory.rooms[room] = room;
    Memory.datums.globalEnergyAvailable += room.energyAvailable;
    Memory.datums.globalEnergyCapacityAvailable += room.energyCapacityAvailable;

    //i have no idea how to do this. let's just make it shit out spawns first.
    room.creepList = room.find(FIND_MY_CREEPS);
    room.spawnList = room.find(FIND_MY_SPAWNS);
    //get count of all roles of creeps in room;

    //setup levels
    room.memory.levelModel = roomModel[room.controller.level];

    let spawnChoice = determineSpawn(room);
    console.log('spawnChoice: ', spawnChoice);

    spawnCreep(spawnChoice, room);
    //okay? LORD, you're hard to please. We can work on queues tomorrow or whatever, JESUS.

  }

//execute creep roles;
  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};
