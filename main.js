'use strict';

var roleHarvester = require('role-harvester');
var roleUpgrader = require('role-upgrader');
var roleBuilder = require('role-builder');

module.exports.loop = function () {

  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  //spawn harvesters

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  console.log('Harvesters: ' + harvesters.length);

  if(harvesters.length < 4) {
    var harvesterName = Game.spawns['The Base'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
    console.log('Spawning new harvester: ' + harvesterName);
  }

  //spawn upgraders

  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  console.log('Upgraders: ' + upgraders.length);

  if(upgraders.length < 2) {
    var upgraderName = Game.spawns['The Base'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
    console.log('Spawning new upgrader: ' + upgraderName);
  }

  //spawn builders

  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  console.log('Builders: ' + builders.length);

  if(builders.length < 1) {
    var builderName = Game.spawns['The Base'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
    console.log('Spawning new upgrader: ' + builderName);
  }

  var tower = Game.getObjectById('TOWER_ID');
  if(tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax,
    });
    if(closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
      tower.attack(closestHostile);
    }
  }

  for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];
    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if(creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }
};
