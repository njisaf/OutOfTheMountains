'use strict';

module.exports = {

  run: function(creep) {
    // console.log('Harvester hit;');
    if(creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        // creep.say('Harvesting, for God!');
        // console.log('harvesting');
        creep.moveTo(sources[0]);
      }
    }
    else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        },
      });
      // console.log('role-harvester has detected targets: ', targets);
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          // console.log('depositing');
          creep.moveTo(targets[0]);
        }
      }
    }
  },


};
