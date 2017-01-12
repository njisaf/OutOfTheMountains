'use strict';

module.exports = {

  run: function(creep) {
    //check the creep's memory for the mission.
    let mission = Game.creeps[creep].memory.mission;
    let missionStage = Game.creeps[creep].memory.missionStage;

    //i think it's equals...
    if (missionStage === mission.length) {
      Game.creeps[creep].memory.missionStage = 0;
      missionStage = 0;
    }

    let stepString = mission[missionStage];

    let stepSplit = stepString.split('.');
    console.log('stepSplit', stepSplit);
    let action = stepSplit[0];
    let object = stepSplit[1];
    let objectName = stepSplit[2];
    let next = stepSplit[3];

    if (typeof this[action] !== 'function') {
      console.log('!!! GPU action is not a function. Creep: ', creep);
    }
    if (typeof this[next] !== 'function') {
      console.log('!!! GPU next is not a function. Creep: ', creep);
    }

    let target = Game[object][objectName];
    console.log('target', target);

    let doThis = this[action](target, next);
    doThis(creep);

  },

  moveTo: function(target, next) {
    console.log('MoveTo hit');

    let _next = this[next];
    return function _moveTo(creep) {
      if (creep[_next](target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      } else {
        creep[_next](target);
      }
    };
  },

  upgrade: function(target) {

    

  },

};
