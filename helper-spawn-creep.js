'use strict';

module.exports = function(role, _room) {
  let memory = {
    role: role,
  };

  let body = require('role-' + role).body;

  for (var spawn in _room.spawnList) {
    if (Game.spawns[spawn].canCreateCreep(body) === 'OK') {
      let newCreep = Game.spawns[spawn].createCreep(body, undefined, memory);
      newCreep.say('I arise, as a new ' + role);
    }
  }
};
