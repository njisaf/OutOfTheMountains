'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

const setupRatios = {harvester: 50, upgrader: 30, builder: 20};


// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  Memory.globalEnergyAvailable = 0;
  Memory.globalEnergyCapacityAvailable = 0;
  //build global energy counts;
  for (var roomName in Game.rooms) {
    let room = Game.rooms[roomName];
    Memory.globalEnergyAvailable += room.energyAvailable;
    Memory.globalEnergyCapacityAvailable += room.energyCapacityAvailable;

    //i have no idea how to do this. let's just make it shit out spawns first.
    let creepList = room.find(FIND_MY_CREEPS);
    //get count of all roles of creeps in room;
    for (var _creep in creepList) {
      let role = creepList[_creep].memory.role;
      room.memory.creepRoleCount[role] += 1;
    }

    //find the percentages of each role.
    for (var role in room.memory.creepRoleCount) {

    }

    //this doesn't make sense at all. What I should be doing is setting queues or something.
  }



// execute creep roles

  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};
