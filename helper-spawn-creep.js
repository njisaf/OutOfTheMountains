'use strict';

module.exports = function(model, room, mission, body) {
  let memory = {
    assignedTo: room.name,
    model: model,
    mission: mission,
    missionStage: 1,
  };

  //if we set missionStage to 0, we can automate a check on the new creep's mission; fuck it for now;

  if(!body) {
    //we'll stick the body generator in here at first I guess.
    body = [WORK, CARRY, MOVE];
  }

  for (var i = 0; i < room.spawns.length; i++) {
    let spawn = room.spawns[i].name;
    console.log('spawn: ', spawn);
    console.log('spawn energy: ', room.spawns[i].energy);
    if (Game.spawns[spawn].canCreateCreep(body) === 0) {
      let newCreep = Game.spawns[spawn].createCreep(body, undefined, memory);
      console.log('newCreep: ', newCreep);
      //i'll need to be able to handle multiple spawns, which again suggests to me a queue. For now, break;
      break;
    }
    console.log('Can\'t spawn, waiting for next tick');
  }

  // for (var x in _room.spawnList) {
  //   let spawn = _room.spawnList[x];
  //   console.log('spawn: ', spawn);
  //   if (Game.spawns[spawn].canCreateCreep(body) === 'OK') {
  //     let newCreep = Game.spawns[spawn].createCreep(body, undefined, memory);
  //     newCreep.say('I arise, as a new ' + role);
  //     break;
  //   }
  //   console.log('Can\'t spawn, waiting for next tick');
  // }
};
