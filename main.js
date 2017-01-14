'use strict';

const Promise = require('main-promise');

const run = require('main-run-creep');
const cleanAll = require('main-clean-all');

const spawnCreep = require('helper-spawn-creep');

// const roomModel = require('datum-room-model');



module.exports.loop = function() {

  this.fact = {};
  let fact = this.fact;

  Memory.clausewitz = {};

  fact.rooms = {};
  fact.creeps = {};
  // fact.spawns = {};
  fact.globalEnergyAvailable = 0;
  fact.globalEnergyCapacityAvailable = 0;

  function testPromises(greeting) {
    return new Promise((resolve, reject) => {
      if(greeting === 'hello') resolve('hello to you');
      if(greeting !== 'hello') reject('goodbye');
    });
  }

  testPromises('hello')
  .then(res => console.log('res: ', res));

  for (var _room in Game.rooms) {

    fact.rooms[_room] = {};
    let room = fact.rooms[_room];
    room.name = _room;

    room.energyAvailable = Game.rooms[_room].energyAvailable;
    room.energyCapacityAvailable = Game.rooms[_room].energyCapacityAvailable;

    fact.globalEnergyAvailable += room.energyAvailable;
    fact.globalEnergyCapacityAvailable += room.energyCapacityAvailable;

    //these room are all on fact, don't forget
    room.controller = {};
    //have to do this to make it work like the other lists. going to put the assignment function on the object here eventually, but for now...
    room.controller[0] = Game.rooms[_room].controller;
    room.sources = Game.rooms[_room].find(FIND_SOURCES);
    room.spawns = Game.rooms[_room].find(FIND_MY_SPAWNS);
    room.structures = Game.rooms[_room].find(FIND_MY_STRUCTURES);

    //next we're going to run calculations on the things. We'll stick the functions right on the fact room, and call them each time the mission hits. FUCK YEAH

  }


  //spawn some creeps in each room.
  //targets can be anything we have on the fact.rooms[room] object.
    //room is the room it's in... perhaps game as well. Should also be able to accept a specific room name. location too?

  for (var spawnRoom in Game.rooms) {
    let room = fact.rooms[spawnRoom];
    if (!room) {
      console.log('!!! Not ready for spawning! Room: ', room);
    }
    let mission = {
      0: null,
      1: 'moveTo.sources.harvest',
      2: 'moveTo.controller.upgrade',
    };
    spawnCreep('gpu', room, mission, null);
  }


//execute creep roles;
  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    //oh shit son, BIND. that's right, mfer, bind.
    let runThis = run.bind(fact);
    runThis(creep);
  }


  cleanAll();

  Memory.clausewitz = this.fact;

};

// fact.creepList = Game.rooms[room].find(FIND_MY_CREEPS);
// fact.spawnList = Game.rooms[room].find(FIND_MY_SPAWNS);
