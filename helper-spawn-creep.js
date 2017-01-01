'use strict';

module.exports = function(spawnBase, spawnModel, spawnRole) {
  let model = {
    model: spawnModel,
    role: spawnRole,
    base: spawnBase,
  };
  var newName = Game.spawns[spawnBase].createCreep([WORK, CARRY, MOVE], undefined, model);
  console.log(`Spawning new ${spawnModel} at: ${spawnBase};
              New ${spawnModel} name: ${newName};
              New ${spawnModel} role: ${spawnRole}` );
};
