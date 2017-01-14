'use strict';

module.exports = function() {

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

};
