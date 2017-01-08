'use strict';

//executeRole takes the creep's role string and tries to execute a .run() command based on that, by looking for a module with that role name
//Hoping I can get it to reject a 'not a function' error somehow, on the catch block. Not sure about this, let's test it.

module.exports = function(creep) {

  console.log('creep executer: ', creep);

  let role = Game.creeps[creep.name].memory.role;
  let roleModule = require('role-' + role);
  console.log('roleModule: ', roleModule);

  if (typeof roleModule.run === 'function') {
    roleModule.run(creep.name);
  } else {
    console.log('!!! roleModule.run() is not a function for creep: ', creep);
  }

};
