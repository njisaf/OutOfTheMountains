'use strict';

module.exports = function(spawnBase, spawnModel, spawnRole, spawnArray) {
  let model = {
    base: spawnBase,
    model: spawnModel,
    role: spawnRole,
  };
  var newName = Game.spawns[spawnBase].createCreep(spawnArray, undefined, model);
  console.log(`Spawning new ${spawnModel}!
              Spawned at: ${spawnBase}
              ${spawnModel} name: ${newName}
              ${spawnModel} role: ${spawnRole}`);
};
