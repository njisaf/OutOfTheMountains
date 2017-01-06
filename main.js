'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');


// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {


  //build global energy counts;
  for (var roomName in Game.rooms) {
    let room = Game.rooms[roomName];
    Memory.globalEnergyAvailable += room.energyAvailable;
    Memory.globalEnergyCapacityAvailable += room.energyCapacityAvailable;

    //i have no idea how to do this. let's just make it shit out spawns first.
    //get count of all roles of creeps in room;
    let creepList = room.find(FIND_MY_CREEPS);
    for (var creepName in creepList) {
      let role = creepList[creepName].memory.role;
      room.memory.creepRoleCount[role] += 1;
    }
  }



// execute creep roles

  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};
