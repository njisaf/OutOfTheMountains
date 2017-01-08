'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

const determineRole = require('helper-determine-role');
const spawnCreep = require('helper-spawn-creep');

const roomModel = require('datum-room-model');

// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  Memory.datums = {};
  Memory.rooms = {};
  Memory.datums.globalEnergyAvailable = 0;
  Memory.datums.globalEnergyCapacityAvailable = 0;
  //build all stats; Do that first. We'll reformat later if we really need to.
  for (var room in Game.rooms) {

    let _room = {
      name: room,
      spawnList: null,
      creepList: null,
    };

    Memory.rooms[room] = {};
    Memory.rooms[room].datums = {
      creepRoleCount: {},
    };

    Memory.datums.globalEnergyAvailable += room.energyAvailable;
    Memory.datums.globalEnergyCapacityAvailable += room.energyCapacityAvailable;

    _room.creepList = Game.rooms[room].find(FIND_MY_CREEPS);
    _room.spawnList = Game.rooms[room].find(FIND_MY_SPAWNS);

    for (var _creep in _room.creepList) {
      console.log('_creep', _creep);
      let creep = Game.creeps[_creep];
      let role = room.creepList[creep].memory.role;
      console.log('role: ', role);
      Memory.rooms[room].datums.creepRoleCount[role] = 0;
      Memory.rooms[room].datums.creepRoleCount[role] += 1;
    }

    //setup levels
    let level = Game.rooms[room].controller.level;
    Memory.rooms[room].levelModel = roomModel[level];

    let roleChoice = determineRole(_room);
    console.log('roleChoice: ', roleChoice);
    spawnCreep(roleChoice, _room);

  }

//execute creep roles;
  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};
