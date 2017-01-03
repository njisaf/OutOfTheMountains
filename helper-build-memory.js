'use strict';

module.exports = {

  update: function() {
    this.scaffold();
    this.globalToggles();
    this.commander();
    this.clean();
  },

  scaffold: function() {
    //scaffold checks to see if certain memory structures exist and creates them; for now, for bugfixing while we stumble forward;

    if (!Memory.globalToggles) {
      Memory.globalToggles = {};
    }

    if (!Memory.clausewitz) {
      Memory.clausewitz = {};
    }
  },

  globalToggles: function() {
    //globalToggles sets global targets, which I speculate should be:
      //state of war or peace
      //target rooms for reinforcement etc

  },

  clausewitz: function() {

    //clausewitz organizes info in the way we want it;

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
