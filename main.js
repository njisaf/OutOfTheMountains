'use strict';

const run = require('main-run-creep');
const cleanAll = require('main-clean-all');

// const determineRole = require('helper-determine-role');
const spawnCreep = require('helper-spawn-creep');

const roomModel = require('datum-room-model');



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


  //spawn some creeps in each room.
  //targets can be anything we have on the fact.rooms[room] object.
    //room is the room it's in... perhaps game as well. Should also be able to accept a specific room name. location too?

  for (var spawnRoom in Game.rooms) {
    let room = fact.rooms[spawnRoom];
    let mission = {
      0: null,
      1: 'moveTo.sources@room.harvest',
      2: 'moveTo.controller@room.upgrade',
    };
    spawnCreep('gpu', room, mission, null);
  }


//execute creep roles;
  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    run(creep);
  }


  cleanAll();

  Memory.clausewitz = this.fact;

};

// fact.creepList = Game.rooms[room].find(FIND_MY_CREEPS);
// fact.spawnList = Game.rooms[room].find(FIND_MY_SPAWNS);
