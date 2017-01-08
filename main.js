'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

const determineSpawn = require('helper-determine-spawn');
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
    Memory.datums.globalEnergyAvailable += room.energyAvailable;
    Memory.datums.globalEnergyCapacityAvailable += room.energyCapacityAvailable;

    //i have no idea how to do this. let's just make it shit out spawns first.
    let creepList = room.find(FIND_MY_CREEPS);
    //get count of all roles of creeps in room;
    for (var _creep in creepList) {
      let role = creepList[_creep].memory.role;
      console.log('role', role);
      room.memory.datums.creepRoleCount[role] += 1;
    }


    //attach data to rooms
    //I can just stick shit on here, we're only using it per loop... we don't need to stick it in memory AT ALL;
    room.spawnList = room.find(FIND_MY_SPAWNS);


    //check the energy levels, yeah?
    //what we can do for these checks is like scenarios, have an object with properties. Then we for in over the keys, run a function that sets truthy or falsy on the check, and set the value based on that.
    //fuck that, just if statements for now. We'll make it more sophisticated later, the point is that they get checked right now. LET'S SPAWN SOMETHING FOR FUCKS SAKE

    //setup levels
    //this level model sets the bottom level of activity I think I need to run the rooms.
    //as soon as these are maintained
    room.memory.levelModel = roomModel[room.controller.level];

    let spawnChoice = determineSpawn(room);
    //should return a string name for the role; eventually I want it to be an object with the role and the spawn, but I'll need to think about things a bit more than that.
    //I'll need to look at the spawnlist, basically. then I can do it.
    console.log('spawnChoice: ', spawnChoice);

    spawnCreep(spawnChoice, room);

  }





// execute creep roles

  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    executeRole(creep);
  }


  cleanAll();

};
