'use strict';

//role builder

module.exports = {

  body: [WORK, CARRY, MOVE],

  run: function(creep) {
    // console.log('Builder hit;');
    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('Harvesting, for God!');
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('Building, glory to God!');
    }

    if(creep.memory.building) {
      let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    }
    else {
      let sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
  },

};
