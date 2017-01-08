'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

const determineRole = require('helper-determine-role');
const spawnCreep = require('helper-spawn-creep');

const roomModel = require('datum-room-model');

// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  Memory.datums = {};
  Memory.datums.globalEnergyAvailable = 0;
  Memory.datums.globalEnergyCapacityAvailable = 0;
  //build all stats; Do that first. We'll reformat later if we really need to.
  for (var _room in Game.rooms) {
    let room = Game.rooms[_room];

    Memory.rooms[room].datums = {};

    Memory.datums.globalEnergyAvailable += room.energyAvailable;
    Memory.datums.globalEnergyCapacityAvailable += room.energyCapacityAvailable;

    room.creepList = room.find(FIND_MY_CREEPS);
    room.spawnList = room.find(FIND_MY_SPAWNS);

    for (var _creep in room.creepList) {
      let role = room.creepList[_creep].memory.role;
      console.log('role: ', role);
      Memory.rooms[room].datums.creepRoleCount[role] = 0;
      Memory.rooms[room].datums.creepRoleCount[role] += 1;
    }

    //setup levels
    Memory.rooms[room].levelModel = roomModel[room.controller.level];

    let roleChoice = determineRole(room);
    console.log('roleChoice: ', roleChoice);
    spawnCreep(roleChoice, room);

  }

//execute creep roles;
  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};
