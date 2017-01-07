'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

const checkRooms = require('datum-check-rooms');

// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  Memory.globalEnergyAvailable = 0;
  Memory.globalEnergyCapacityAvailable = 0;
  //build all stats; Do that first. We'll reformat later if we really need to.
  for (var _room in Game.rooms) {
    let room = Game.rooms[_room];
    Memory.datums.globalEnergyAvailable += room.energyAvailable;
    Memory.datums.globalEnergyCapacityAvailable += room.energyCapacityAvailable;

    //i have no idea how to do this. let's just make it shit out spawns first.
    let creepList = room.find(FIND_MY_CREEPS);
    //get count of all roles of creeps in room;
    for (var _creep in creepList) {
      let role = creepList[_creep].memory.role;
      room.memory.datums.creepRoleCount[role] += 1;
    }


    //attach data to rooms
    let spawnList = room.find(FIND_MY_SPAWNS);
    room.memory.datums.spawnList = spawnList;

    //check the energy levels, yeah?
    //what we can do for these checks is like scenarios, have an object with properties. Then we for in over the keys, run a function that sets truthy or falsy on the check, and set the value based on that.


  }





// execute creep roles

  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};
