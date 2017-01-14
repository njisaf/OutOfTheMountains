'use strict';

module.exports.loop = function() {

  for (var r in Game.rooms) {
    let room = new Room(Game.rooms[r]);

    this.roomList = {};
    this.roomList[r] = room;
  }

};
