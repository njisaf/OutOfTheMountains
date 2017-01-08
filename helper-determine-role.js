'use strict';

module.exports = function(_room) {
  let maxValue = null;
  let maxRole = null;

  if (!Memory.rooms[_room].datums.creepRoleCount) {
    Memory.rooms[_room].datums.creepRoleCount = {};
    for (var modelRole in Memory.rooms[_room].levelModel.creeps) {
      Memory.rooms[_room].datums.creepRoleCount[modelRole] = 0;
    }
  }
  
  for (var _role in Memory.rooms[_room].datums.creepRoleCount) {
    console.log('_role: ', _role);
    let remainder = 0;

    if (Memory.rooms[_room].datums.creepRoleCount[_role] === 0) {
      console.log(_role + 'in ' + _room + ' is at 0, attempting to spawn immediately;');
      maxRole = _role;
      break;
    }

    let role = Memory.rooms[_room].datums.creepRoleCount[_role];
    let match = Memory.rooms[_room].levelModel.creeps[_role];
    if (role < match) {
      remainder = role % match;
      console.log('remainder: ', remainder);
    }
    if (remainder > maxValue) {
      remainder = maxValue;
      console.log('maxValue: ', maxValue);
      maxRole = _role;
    }
  }
  console.log('maxRole: ', maxRole);
  return maxRole;
};
