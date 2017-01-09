'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

const determineRole = require('helper-determine-role');
const spawnCreep = require('helper-spawn-creep');

const roomModel = require('datum-room-model');

// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  PathFinder.use(isEnabled);

  this.clausewitz = {};
  let clausewitz = this.clausewitz;

  clausewitz.rooms = {};
  clausewitz.creeps = {};

  clausewitz.globalEnergyAvailable = 0;
  clausewitz.globalEnergyCapacityAvailable = 0;

  //build all stats; Do that first. We'll reformat later if we really need to.
  for (var room in Game.rooms) {

    clausewitz.rooms[room] = {};

    clausewitz.roomLevel = Game.rooms[room].controller.level;
    clausewitz.rooms[room].levelModel = roomModel[clausewitz.roomLevel];

    clausewitz.globalEnergyAvailable += Game.rooms[room].energyAvailable;
    clausewitz.globalEnergyCapacityAvailable += Game.rooms[room].energyCapacityAvailable;

    clausewitz.creepList = Game.rooms[room].find(FIND_MY_CREEPS);
    clausewitz.spawnList = Game.rooms[room].find(FIND_MY_SPAWNS);

    if (Memory.rooms[room].levelModel) {
      clausewitz.rooms[room].creepRoleCount = {};
      for (var modelRole in clausewitz.rooms[room].levelModel.maintain) {
        clausewitz.rooms[room].creepRoleCount[modelRole] = 0;
      }
    }

    if (_room.creepList.length) {
      for (var i = 0; i < _room.creepList.length; i++) {
        let _creep = _room.creepList[i].name;
        console.log('_creep', _creep);
        let role = Memory.creeps[_creep].role;
        console.log('role: ', role);
        if (!Memory.rooms[room].datums.creepRoleCount[role])
          Memory.rooms[room].datums.creepRoleCount[role] = 0;
        Memory.rooms[room].datums.creepRoleCount[role] += 1;
      }
    }

    let roleChoice = determineRole(room);

    //might be better to put a toggle on the room, "level" or something;

    if(roleChoice !== 'level') {
      console.log('roleChoice: ', roleChoice);
      spawnCreep(roleChoice, _room);
    }

  }

//execute creep roles;
  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};
