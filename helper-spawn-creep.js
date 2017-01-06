'use strict';

module.exports = function(role, base, body) {
  let model = {
    role: role,
  };

  return new Promise((resolve, reject) => {

    if (Game.spawns[base].canCreateCreep(body) === 'OK') {
      let newCreep = Game.spawns[base].createCreep(body, undefined, model);
    }


  });
  // console.log(`Spawning new ${spawnRole}!
              // Spawned at ${spawnBase} with name: ${newName}`);
};
