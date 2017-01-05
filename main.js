'use strict';

const energyAvailable = require('main-get-room-energyavailable');
const energyCapacityAvailable = require('main-get-room-energycapacity');

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');


// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

//maintain energy

  for (var roomName in Game.rooms) {
    //loop over rooms, determine what state they are in and set them to be in setup or whatever.
    let globalEnergy = {};

    let room = Game.rooms[roomName];

    Promise.all([
      energyAvailable(room),
      energyCapacityAvailable(room),
    ])
    .then(values => {
      //values should be an array of objects. we'll loop over the array, and iterate the values onto the global objects
      console.log('room values: ', values);
      for (var i = 0; i < values.length; ++i) {
        //grab any keys off values[i], and ++ them on the global object. if they don't exist they should add it, right?
        let value = Object.keys(values[i]);

        for (var key in value) {
          globalEnergy[value] += value[key];
        }


      }
    })
    .catch(err => console.log(err));

  }

//execute creeps

  for (var creepName in Game.creeps) {

    let creep = Game.creeps[creepName];

    executeRole(creep)
    .then()
    .catch();

  }


  cleanAll();

};
