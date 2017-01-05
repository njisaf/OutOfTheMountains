'use strict';

const cleanAll = require('main-clean-all');

// in loop, we put everything that needs to be done every tick. Simple as that. If we need it to do anything else we'll build another set of functions;

module.exports.loop = function() {

  for (var room in Game.rooms) {
    //loop over rooms, determine what state they are in and set them to be in setup or whatever.

  }

  for (var creep in Game.creeps) {
    //loop over all creeps and execute their roles. Their roles should be literally the function name. It think I can do that with like .eval() right?

  }

  cleanAll();

};
