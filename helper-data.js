'use strict';

module.exports = {

  update: function() {
    this.creepsByRoom();
  },

  creepsByRoom: function() {

    Memory.creepsByRoom = {};

    //grab all friendly creeps in each friendly room.
    for (var room in Game.rooms) {
      let creepList = Game.rooms[room].find(FIND_MY_CREEPS);

      let newRoom = {
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

      Memory.creepsByRoom[room] = newRoom;
    }

  },

  dataList: function() {
    // console.log('Generating dataList');
    //create list;
    let dataList = {
      myRooms: {},
    };
    Memory.dataList = dataList;

    //loop over list of all rooms and create a node for each on dataList;

    //loop over rooms;
    for (var room in Game.rooms) {
      //find things in room
      let structListMine = Game.rooms[room].find(FIND_MY_STRUCTURES);
      let structListFoesCount = Game.rooms[room].find(FIND_HOSTILE_STRUCTURES).length;
      let hostileCreepCount = Game.rooms[room].find(FIND_HOSTILE_CREEPS).length;
      let creepList = Game.rooms[room].find(FIND_MY_CREEPS);

      //build structure objects from list;
      let myStructuresObj = {};

      for (var i = 0; i < structListMine.length; ++i) {
        let structLate = {
          position: structListMine[i].pos,
          id: structListMine[i].id,
        };
        myStructuresObj[structListMine[i].structureType] = structLate;
      }

      //template for room;
      let newRoom = {
        hostileStructuresCount: structListFoesCount,
        hostileCreepsCount: hostileCreepCount,
        myStructures: myStructuresObj,
        myCreeps: {},
      };

      //add creeps to array;
      for (var j = 0; j < creepList.length; ++j) {
        let creep = Game.creeps[creepList[j].name].memory;
        let creepLate = {
          model: creep.model,
          role: creep.role,
          base: creep.base,
        };

        newRoom.myCreeps[creepList[j].name] = creepLate;
      }

      //stick the room template on dataList
      // console.log('newRoom: ', newRoom);
      Memory.dataList.myRooms[room] = newRoom;
    }
  },


};
