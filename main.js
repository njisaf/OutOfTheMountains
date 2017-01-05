'use strict';

const energyAvailable = require('main-get-room-energyavailable');
const energyCapacityAvailable = require('main-get-room-energycapacity');

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');


// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  for (var roomName in Game.rooms) {
    //loop over rooms, determine what state they are in and set them to be in setup or whatever.
    let room = Game.rooms[roomName];

    Promise.all([
      energyAvailable(room),
      energyCapacityAvailable(room),
    ])
    .then(values => {
      console.log('room values: ', values);
    })
    .catch(err => console.log(err));

  }

  for (var creepName in Game.creeps) {

    let creep = Game.creeps[creepName];

    executeRole(creep)
    .then()
    .catch();

  }


  cleanAll();

};
