'use strict';

module.exports = function(_room) {
  let maxValue = null;
  let maxRole = null;


  for (var _role in Memory.rooms[_room].datums.creepRoleCount) {
    console.log('_role: ', _role);
    let remainder = 0;

    if (Memory.rooms[_room].datums.creepRoleCount[_role] === 0) {
      console.log(_role + ' in ' + _room + ' is at 0, attempting to spawn immediately;');
      maxRole = _role;
      break;
    }

    let role = Memory.rooms[_room].datums.creepRoleCount[_role];
    console.log('dertmineRole role: ', role);
    let match = Memory.rooms[_room].levelModel.maintain[_role];
    console.log('dertmineRole match: ', match);
    if (role < match) {
      remainder = role % match;
      console.log('remainder: ', remainder);
    } else if (role === match) {
      console.log(_role + ' is at level!');
      maxRole = 'level';
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
