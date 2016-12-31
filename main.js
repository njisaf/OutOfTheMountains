'use strict';

module.exports.loop = function() {

  //clear dead creeps from memory

  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  //detect number of creeps in room
    //loop over Memory.creeps, count roles, add to count
      //is that necessary? perhaps we can pull directly from the Memory?
  //detect creep roles in room

  //detect structures in room
  //detect state of structures in room?
  //if structures in incomplete or damaged state, spawn GPU.
  //ignore controller? controller gets upgraded if everything else done or if not at level.

  //if all structures complete and controller upgraded, GPUs migrate? except for one? maintenance GPU;
    //what we want eventually is for them to spawn some sort of migration convoy and then suicide;

};
