'use strict';

module.exports.loop = function() {

  for (var room in Game.rooms) {
    //loop over rooms, determine what state they are in and set them to be in setup or whatever.
  }

  for (var creep in Game.creeps) {
    //loop over all creeps and execute their roles. Their roles should be literally the function name. It think I can do that with like .eval() right?

  }

};
