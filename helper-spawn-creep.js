'use strict';

module.exports = function(role, _room) {
  let memory = {
    role: role,
  };

  let body = require('role-' + role).body;
  console.log('body: ', body);

  for (var x in _room.spawnList) {
    let spawn = _room.spawnList[x];
    console.log('spawn: ', spawn);
    if (Game.spawns[spawn].canCreateCreep(body) === 'OK') {
      let newCreep = Game.spawns[spawn].createCreep(body, undefined, memory);
      newCreep.say('I arise, as a new ' + role);
      break;
    }
    console.log('Can\'t spawn, waiting for next tick');
  }
};
