'use strict';

//energyCapacityAvailable per room

module.exports = function(room) {

  return new Promise((resolve, reject) => {
    //no better way to do this, can't hold this in memory;
    let energyCapacityAvailable = room.energyCapacityAvailable;

    if(energyCapacityAvailable) {
      resolve({
        energyCapacityAvailable,
      });
    } else {
      reject('!!! energyCapacityAvailable has failed. energyCapacityAvailable: ' + energyCapacityAvailable);
    }

  });

};
