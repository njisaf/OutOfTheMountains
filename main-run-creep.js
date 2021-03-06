'use strict';

module.exports = function(creep) {

  // let fact = this.fact;

  console.log('Running creep: ', creep.name);

  let mission = creep.memory.mission;
  let length = Object.keys(mission).length;
  let missionStage = creep.memory.missionStage;

  console.log(creep.name + ' missionStage 1 now: ' + creep.memory.missionStage);

  //we'll store conditions on the first index of mission;

  if (missionStage >= length) {
    creep.memory.missionStage = 1;
    missionStage = 1;
    console.log(creep.name + ' missionStage reset to: ' + creep.memory.missionStage);
  }

  let model = creep.memory.model;
  let role = require('role-' + model);

  let stepString = mission[missionStage];
  console.log('stepString ', stepString);
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

  let assignedTo = creep.memory.assignedTo;
  console.log('run-room: ', assignedTo);
  let room = this.rooms[assignedTo];
  console.log('room ', room);
  let list = room[object];
  console.log('list ', list);
  let target = list[0];
  console.log('run-target: ', target);

  let doThis = role[action];
  doThis(creep, target, role[next]);

};
