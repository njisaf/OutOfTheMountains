'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

// const determineRole = require('helper-determine-role');
// const spawnCreep = require('helper-spawn-creep');

const roomModel = require('datum-room-model');

// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  // PathFinder.use(isEnabled);

  this.fact = {};
  let fact = this.fact;

  fact.rooms = {};
  fact.creeps = {};

  fact.globalEnergyAvailable = 0;
  fact.globalEnergyCapacityAvailable = 0;

  //build all stats; Do that first. We'll reformat later if we really need to.
  for (var room in Game.rooms) {

    fact.rooms[room] = {};
    fact.rooms[room].creeps = {};

    fact.roomLevel = Game.rooms[room].controller.level;
    fact.rooms[room].levelModel = roomModel[fact.roomLevel];

    fact.globalEnergyAvailable += Game.rooms[room].energyAvailable;
    fact.globalEnergyCapacityAvailable += Game.rooms[room].energyCapacityAvailable;

    if (fact.rooms[room].levelModel) {
      fact.rooms[room].creepRoleCount = {};
      for (var modelRole in fact.rooms[room].levelModel.maintain) {
        fact.rooms[room].creepRoleCount[modelRole] = 0;
      }
    }
  }

  for (var creep in Game.creeps) {

    let creepRoom = Game.creeps[creep]._move.room;
    fact.rooms[creepRoom][creep] = {};

    fact.creeps[creep] = {};

    let creepMission = Game.creeps[creep].memory.mission;
    fact.creeps[creep].mission = creepMission;
    fact.rooms[creepRoom][creep].mission = creepMission;
  }

    // if (fact.creepList.length) {
    //   for (var i = 0; i < fact.creepList.length; i++) {
    //     let _creep = fact.creepList[i].name;
    //     console.log('_creep', _creep);
    //     let role = Game.creeps[_creep].memory.role;
    //     console.log('role: ', role);
    //     if (!fact.rooms[room].creepRoleCount[role])
    //       fact.rooms[room].creepRoleCount[role] = 0;
    //     fact.rooms[room].creepRoleCount[role] += 1;
    //   }
    // }

    // let roleChoice = determineRole(room);
    //
    // //might be better to put a toggle on the room, "level" or something;
    //
    // if(roleChoice !== 'level') {
    //   console.log('roleChoice: ', roleChoice);
    //   spawnCreep(roleChoice, _room);
    // }


//execute creep roles;
  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};

// fact.creepList = Game.rooms[room].find(FIND_MY_CREEPS);
// fact.spawnList = Game.rooms[room].find(FIND_MY_SPAWNS);
