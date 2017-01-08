'use strict';

module.exports = function(room) {
  let maxValue = null;
  let maxRole = null;

  for (var _role in room.memory.datums.creepRoleCount) {
    console.log('_role: ', _role);
    let remainder = 0;
    let role = room.memory.datums.creepRoleCount[_role];
    let match = room.memory.model[_role];
    if (role < match) {
      remainder = role % match;
    }
    if (remainder > maxValue) {
      remainder = maxValue;
      maxRole = _role;
    }
  }
  return maxRole;
};
