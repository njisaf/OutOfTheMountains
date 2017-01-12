'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');

// const determineRole = require('helper-determine-role');
// const spawnCreep = require('helper-spawn-creep');

const roomModel = require('datum-room-model');

// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

// fact = {
//   rooms: {
//     creeps: {
//       creepname: {
//
//       },
//     },
//     creepMissionCount: {
//       missionname: {
//         creepname: {},
//       },
//       //etc
//     },
//     creepModelCount: {
//       modelname: {
//         creepname: {},
//       },
//       //etc
//     },
//     spawns: {
//       spawnname: {
//
//       },
//     },
//     roomLevel: 0,
//     levelModel: {
//       //etc
//     },
//   },
//   creeps: {
//     creepname: {
//       mission: 'string',
//
//
//     },
//   },
//   // spawns: {
//   //
//   // },
//   globalEnergyAvailable: 0,
//   globalEnergyCapacityAvailable: 0,
//
// };

module.exports.loop = function() {

  // PathFinder.use(isEnabled);

  this.fact = {};
  let fact = this.fact;

  fact.rooms = {};
  fact.creeps = {};
  fact.spawns = {};

  fact.globalEnergyAvailable = 0;
  fact.globalEnergyCapacityAvailable = 0;

  //build all stats; Do that first. We'll reformat later if we really need to.
  for (var room in Game.rooms) {

    fact.rooms[room] = {};

    fact.rooms[room].creeps = {};
    fact.rooms[room].creepMissionCount = {};

    fact.rooms[room].roomLevel = Game.rooms[room].controller.level;
    fact.rooms[room].levelModel = roomModel[fact.roomLevel];

    fact.globalEnergyAvailable += Game.rooms[room].energyAvailable;
    fact.globalEnergyCapacityAvailable += Game.rooms[room].energyCapacityAvailable;

    if (fact.rooms[room].levelModel) {
      fact.rooms[room].creepModelCount = {};
      for (var modelRole in fact.rooms[room].levelModel.maintain) {
        fact.rooms[room].creepModelCount[modelRole] = 0;
      }
    }
  }

  for (var creep in Game.creeps) {

    fact.creeps[creep] = {};

    let creepRoom = Game.creeps[creep].pos.room;
    fact.rooms[creepRoom].creeps = {};
    fact.rooms[creepRoom].creeps[creep] = {};

    //add missions and mission counts
    let creepMission = Game.creeps[creep].memory.mission;
    fact.creeps[creep].mission = creepMission;
    fact.rooms[creepRoom][creep].mission = creepMission;
    fact.rooms[creepRoom].creepMissionCount = {};
    fact.rooms[creepRoom].creepMissionCount[creepMission][creep] = {};

    //do roles too
    let creepModel = Game.creeps[creep].memory.model;
    fact.creeps[creep].model = creepModel;
    fact.rooms[creepRoom][creep].model = creepModel;
    fact.rooms[creepRoom].creepModelCount = {};
    fact.rooms[creepRoom].creepModelCount[creepModel][creep] = {};
  }

  //okay now we need the spawns!
  for (var spawn in Game.spawns) {

    //add spawn to the spawn list
    // fact.spawns[spawn] = {};

    //find the spawn room
    let spawnRoom = Game.spawns[spawn].pos.room;

    //add spawn list to the room, add the spawn to the list;
    fact.rooms[spawnRoom].spawns = {};
    //trying to add whole object, I'll need it all. Might not work?
    fact.rooms[spawnRoom].spawns[spawn] = Game.spawns[spawn];
  }


    //well there we go, we've bloody reconstructed the object for some reason. I sort of remember what I was doing.

    //it's ridiculous that I did all that, totally ridiculous... Oh well, I'm sure there'll be a point somewhere.
    //okay what we're doing here is detecting a mission. Our first mission is harvestAndTransfer. This will harvest from source, and then deposit it immediately in the nearest structure.
    //well, let's think this through. harvest is one thing. Maybe we should break it down.
    //like we set the mission like, moveTo(target), harvest(target);
      //better as an array as planned. [moveTo(target1), harvest(target1), moveTo(target2), transfer(target2)]
        //so we write our own syntax, and the command does like, checks if it's at the target then does whatever.
          //so the target is a what? Depends on the commands we use, let's start with moveTo target.



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

  Memory.clausewitz = this.fact;

};

// fact.creepList = Game.rooms[room].find(FIND_MY_CREEPS);
// fact.spawnList = Game.rooms[room].find(FIND_MY_SPAWNS);
