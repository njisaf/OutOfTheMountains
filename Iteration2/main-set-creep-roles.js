'use strict';

const spawnCreep = require('helper-spawn-creep');
const assignRoles = require('helper-assign-roles');

module.exports = function() {

  //I probably want to set a bunch of toggles somewhere in Memory, and then we check the conditions on the front. Let's do that next, seems easy. Rejigger memory
  for (var room in Memory.rooms) {

    let gpuNameArray = Memory.rooms[room].gpuNameArray;
    //basic setup, get to five GPUs.
    if(Memory.rooms[room].toggles.setupStage === 1) {
        //we might be able to filter this according to available energy, but bugger for now;
      let spawn = Game.rooms[room].find(FIND_MY_SPAWNS);
      spawnCreep(spawn[0].name, 'GPU', 'harvester', [WORK, CARRY, MOVE]);
    }

    if (Memory.rooms[room].toggles.setupStage === 2) {

      let roleArray = new Array(gpuNameArray.length).fill('builder');
      // console.log('roleArray: ', roleArray);
      assignRoles(gpuNameArray, roleArray);
    }

    if (Memory.rooms[room].toggles.setupStage === 3) {

      let roleArray = new Array(gpuNameArray.length).fill('upgrader');
      // console.log('roleArray: ', roleArray);
      assignRoles(gpuNameArray, roleArray);
    }

  }

};
