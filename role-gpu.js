'use strict';

module.exports = {

  run: function(creep) {
    //check the creep's memory for the mission.
    let mission = creep.memory.mission;
    let missionStage = creep.memory.missionStage;

    //we'll store conditions on the first index of mission;

    if (missionStage > mission.length) {
      creep.memory.missionStage = 1;
      missionStage = 1;
    }

    let stepString = mission[missionStage];

    let stepSplit = stepString.split('.');
    console.log('stepSplit', stepSplit);
    let action = stepSplit[0];
    let object = stepSplit[1];
    let hash = stepSplit[2];
    let next = stepSplit[3];

    if (typeof this[action] !== 'function') {
      console.log('!!! GPU action is not a function. Creep: ', creep);
    }
    if (typeof this[next] !== 'function') {
      console.log('!!! GPU next is not a function. Creep: ', creep);
    }

    let target = Game[object][hash];
    console.log('target', target);

    let doThis = this[action](target, next);
    doThis();

  },

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
