'use strict';

module.exports = function GeneralPurposeUnit() {

  this.spawn = function(spawnBase, spawnRole) {
    var model = {
      model: 'GPU',
      role: spawnRole,
      base: spawnBase,
    };
    var newName = Game.spawns[spawnBase].createCreep([WORK, CARRY, MOVE], undefined, model);
    console.log(`Spawning new GeneralPurposeUnit at: ${spawnBase};
                New GPU name: ${newName};
                New GPU role: ${spawnRole}` );
  };

  this.harvester = function(creep) {
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
        }
      }
    }
  };

  this.upgrader = function(creep) {
    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('harvesting');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('upgrading');
    }

    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    else {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
  };

  this.builder = function(creep) {
    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('harvesting');
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('building');
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
  };
};
