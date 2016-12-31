'use strict';

module.exports = function(roleName, number, array) {

  var creepCount = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
  console.log(roleName + ' count: ' + creepCount.length);

  if(creepCount.length < number) {
    var newName = Game.spawns['The Base'].createCreep(array, undefined, {role: roleName});
    console.log('Spawning new ' + roleName + ': ' + newName);
  }

};
