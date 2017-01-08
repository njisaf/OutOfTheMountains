'use strict';

module.exports = function(_room) {
  let maxValue = null;
  let maxRole = null;

  let room = Memory.rooms[_room];

  for (var _role in room.datums.creepRoleCount) {
    console.log('_role: ', _role);
    let remainder = 0;
    let role = room.datums.creepRoleCount[_role];
    let match = room.levelModel.creeps[_role];
    if (role < match) {
      remainder = role % match;
    }
    if (remainder > maxValue) {
      remainder = maxValue;
      maxRole = _role;
    }
  }
  console.log('maxRole: ', maxRole);
  return maxRole;
};
