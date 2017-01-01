'use strict';

module.exports = {

  update: function() {
    this.dataList();
  },

  creepsByRoom: function() {

    Memory.creepsByRoom = {};

    for (var room in Game.rooms) {
      let creepList = Game.rooms[room].find(FIND_MY_CREEPS);

      let newRoom = {
        gpuCount: creepList.length,
        gpuNameArray: [],
      };

      for (var i = 0; i < creepList.length; ++i) {
        newRoom.gpuNameArray.push(creepList[i].name);
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
