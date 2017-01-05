'use strict';

module.exports = {

  scaffold: function() {
    //scaffold checks to see if certain memory structures exist and creates them; for now, this is for bugfixing while we stumble forward; pretty sure it's not necessary, the update functions should just create the objects as they go if they aren't there.

    if (!Memory.globalToggles) {
      Memory.globalToggles = {};
    }

    if (!Memory.rooms) {
      Memory.rooms = Game.rooms;
    }

  },

  globalToggles: function() {
    //globalToggles sets global targets, basically anything that isn't a room level thing;
    //For now, let's set some simple values

    Memory.gpuSetupCount = 5;

  },

  rooms: function() {

    //these set conditional toggles for individual rooms, which subsequent functions act upon to dictate creep roles within the room;

    //grab all friendly creeps in each friendly room.
    for (var room in Game.rooms) {
      let creepList = Game.rooms[room].find(FIND_MY_CREEPS);
      let constructionSites = Game.rooms[room].find(FIND_CONSTRUCTION_SITES);
      let energyAvailable = Game.rooms[room].energyAvailable;
      let energyCapacityAvailable = Game.rooms[room].energyCapacityAvailable;
      let controller = Game.rooms[room].controller;

      let newRoom = {
        toggles: {},
        controller,
        energyAvailable,
        energyCapacityAvailable,
        constructionSites,
        gpuNameArray: [],
        gpuRoles: {},
      };

      //loop over list, find GPUs, push to name array and role object;
      for (var i = 0; i < creepList.length; ++i) {
        let name = creepList[i].name;
        if(Game.creeps[name].memory.model === 'GPU') {
          newRoom.gpuNameArray.push(name);
          newRoom.gpuRoles[name] = Game.creeps[name].memory.role;
        }
      }

      Memory.rooms[room] = newRoom;
    }

  },


  clean: function() {

    //clean creeps
    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory: ', name);
      }
    }

    //clean rooms
    for(var room in Memory.rooms) {
      if(!Game.rooms[room]) {
        delete Memory.rooms[room];
        console.log('Clearing non-existing room memory: ', room);
      }
    }

    //going to need loops for my data once I work it out;

  },



};
