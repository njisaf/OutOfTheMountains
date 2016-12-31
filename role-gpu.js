'use strict';

module.exports = {

  spawn: function(spawnBase, spawnRole) {
    var model = {
      model: 'GPU',
      role: spawnRole,
      base: spawnBase,
    };
    var newName = Game.spawns[spawnBase].createCreep([WORK, CARRY, MOVE], undefined, model);
    console.log(`Spawning new GeneralPurposeUnit at: ${spawnBase};
                New GPU name: ${newName};
                New GPU role: ${spawnRole}` );
  },

  harvester: function(creep) {
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
      console.log('role-harvester has detected targets: ', targets);
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          // console.log('depositing');
          creep.moveTo(targets[0]);
        }
      }
    }
  },

  upgrader: function(creep) {
    // console.log('Upgrader hit;');
    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('Harvesting, for God!');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('Upgrading, praise God!');
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
  },

  builder: function(creep) {
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
