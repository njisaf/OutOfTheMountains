'use strict';

module.exports = function(nameArray, roleArray) {

  if (nameArray.length !== roleArray.length) {
    console.log('ERROR! assignRoles array lengths not the same');
  }

  for (var i = 0; i < nameArray.length; ++i) {
    Game.creeps[nameArray[i]].memory.role = roleArray[i];
  }

};
