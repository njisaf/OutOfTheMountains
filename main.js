'use strict';

const executeRole = require('main-execute-role');
const cleanAll = require('main-clean-all');


// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  for (var room in Game.rooms) {
    //loop over rooms, determine what state they are in and set them to be in setup or whatever.

  }

  for (var name in Game.creeps) {

    let creep = Game.creeps[name];

    executeRole(creep)
    .then()
    .catch();

  }

    // if(creep.memory.role === 'setupHarvester') {
    //   roleSetupHarvester.run(creep);
    // }
    // if(creep.memory.role === 'setup-upgrader') {
    //   roleSetupUpgrader.run(creep);
    // }
    // if(creep.memory.role === 'setup-builder') {
    //   roleSetupBuilder.run(creep);
    // }


  cleanAll();

};
