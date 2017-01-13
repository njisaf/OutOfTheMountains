'use strict';

// General Purpose Unit v2.0
  //The GPU is a fire-and-forget drone specializing in base construction and maintenance.
  //Its advanced functions and checks ensure that your base is erected with clockwork efficiency and unparalleled speed.
  //constants will be set by scenario.

module.exports = {

  moveTo: function(creep, target, next) {
    console.log('MoveTo hit');

    let check = next(creep, target);
    console.log('moveTo check: ', check);

    if (check === ERR_NOT_IN_RANGE) {
      console.log('moveTo target', target);
      creep.moveTo(target);
    } else {
      next(creep, target);
    }
  },

  upgrade: function(creep, target) {
    console.log('upgrade hit');

    if(creep.carry.energy === 0) {
      creep.memory.missionStage += 1;
      creep.say('Energy expended. Advancing stage');
    } else {
      if (creep.upgradeController(target) === ERR_INVALID_TARGET) {
        console.log('!!! GPU.upgrade ERR_INVALID_TARGET: ', target);
      } else {
        creep.upgradeController(target);
        if(creep.carry.energy === 0) {
          creep.memory.missionStage += 1;
          creep.say('Energy expended. Advancing stage');
        }
      }
    }
  },

  harvest: function(creep, target) {
    console.log('harvest hit');

    if(creep.carry.energy === creep.carryCapacity) {
      creep.memory.missionStage += 1;
      creep.say('Energy full. Advancing stage');
    } else {
      creep.harvest(target);
      if(creep.carry.energy === creep.carryCapacity) {
        creep.memory.missionStage += 1;
        creep.say('Energy full. Advancing stage');
      }
    }
  },

};


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
// //   creeps: {
// //     creepname: {
// //       mission: 'string',
// //
// //
// //     },
// //   },
// //   // spawns: {
// //   //
// //   // },
// //   globalEnergyAvailable: 0,
// //   globalEnergyCapacityAvailable: 0,
// //
// // };
//
// //build all stats; Do that first. We'll reformat later if we really need to.
// for (var room in Game.rooms) {
//
//   fact.rooms[room] = {};
//
//   fact.rooms[room].creeps = {};
//   fact.rooms[room].creepMissionCount = {};
//
//   fact.rooms[room].roomLevel = Game.rooms[room].controller.level;
//   fact.rooms[room].levelModel = roomModel[fact.roomLevel];
//
//   fact.globalEnergyAvailable += Game.rooms[room].energyAvailable;
//   fact.globalEnergyCapacityAvailable += Game.rooms[room].energyCapacityAvailable;
//
//   if (fact.rooms[room].levelModel) {
//     fact.rooms[room].creepModelCount = {};
//     for (var modelRole in fact.rooms[room].levelModel.maintain) {
//       fact.rooms[room].creepModelCount[modelRole] = 0;
//     }
//   }
// }
//
// for (var creep in Game.creeps) {
//
//   fact.creeps[creep] = {};
//
//   let creepRoom = Game.creeps[creep].pos.room;
//   fact.rooms[creepRoom].creeps = {};
//   fact.rooms[creepRoom].creeps[creep] = {};
//
//   //add missions and mission counts
//   let creepMission = Game.creeps[creep].memory.mission;
//   fact.creeps[creep].mission = creepMission;
//   fact.rooms[creepRoom][creep].mission = creepMission;
//   fact.rooms[creepRoom].creepMissionCount = {};
//   fact.rooms[creepRoom].creepMissionCount[creepMission][creep] = {};
//
//   //do roles too
//   let creepModel = Game.creeps[creep].memory.model;
//   fact.creeps[creep].model = creepModel;
//   fact.rooms[creepRoom][creep].model = creepModel;
//   fact.rooms[creepRoom].creepModelCount = {};
//   fact.rooms[creepRoom].creepModelCount[creepModel][creep] = {};
// }
//
// //okay now we need the spawns!
// for (var spawn in Game.spawns) {
//
//   //add spawn to the spawn list
//   // fact.spawns[spawn] = {};
//
//   //find the spawn room
//   let spawnRoom = Game.spawns[spawn].pos.room;
//
//   //add spawn list to the room, add the spawn to the list;
//   fact.rooms[spawnRoom].spawns = {};
//   //trying to add whole object, I'll need it all. Might not work?
//   fact.rooms[spawnRoom].spawns[spawn] = Game.spawns[spawn];
// }
