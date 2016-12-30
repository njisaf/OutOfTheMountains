'use strict';

var dataCreepCount = require('data-creep-count');

module.exports = {

  count: 0,

  spawn: function() {
    var creeplist = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + creeplist.length);
    this.count = creeplist.length;
    console.log('Harvesters count now: ', this.count);

    if(this.count < dataCreepCount.harvester) {
      var newName = Game.spawns['The Base'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'harvester'});
      console.log('Spawning new harvester: ', newName);
    }
  },

  run: function(creep) {
    if(creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
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
      console.log('role-harvester has detected targets: ', targets);
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        } else if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_FULL) {
          creep.moveTo(targets[0]);
        }
      }
    }
  },
};
