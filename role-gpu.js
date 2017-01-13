'use strict';

// General Purpose Unit v2.0
  //The GPU is a fire-and-forget drone exceling in base construction and maintenance.
  //Its specialized functions and checks ensure that your base is erected with clockwork efficiency and unparalleled speed.
  //what if I could control the goals of the entire class? set overall priorities for action...
    //oh fuck, that's what the scenario is, shit.

module.exports = {

  moveTo: function(target, next) {
    console.log('MoveTo hit');

    let _next = this[next];
    return function _moveTo(creep) {
      if (_next(creep, target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      } else {
        _next(creep, target);
      }
    };
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
