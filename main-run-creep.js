'use strict';

module.exports = function(creep) {

  // let fact = this.fact;

  let mission = creep.memory.mission;
  let missionStage = creep.memory.missionStage;

  //we'll store conditions on the first index of mission;

  if (missionStage > mission.length) {
    creep.memory.missionStage = 1;
    missionStage = 1;
  }

  let model = creep.memory.model;
  let role = require('role-' + model);

  let stepString = mission[missionStage];

  //

  let stepSplit = stepString.split('.');
  console.log('stepSplit', stepSplit);
  let action = stepSplit[0];
  let object = stepSplit[1];
  let next = stepSplit[2];

  if (typeof role[action] !== 'function') {
    console.log('!!! GPU action is not a function. Creep: ', creep);
  }
  if (typeof role[next] !== 'function') {
    console.log('!!! GPU next is not a function. Creep: ', creep);
  }

  let objectSplit = object.split('@');
  let assignedTo = creep.memory.assignedTo;
  let target = this.rooms[assignedTo][objectSplit[1][0]][objectSplit[0]];
  console.log('run-room: ', assignedTo);
  console.log('run-target: ', target);

  let doThis = role[action](target, next);
  doThis();

};
