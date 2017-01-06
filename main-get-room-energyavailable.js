'use strict';

//energyAvailable per room

module.exports = function(room) {

  return new Promise((resolve, reject) => {
    //no better way to do this, can't hold this in memory;
    let energyAvailable = room.energyAvailable;

    if(energyAvailable) {
      resolve({
        energyAvailable,
      });
    } else {
      reject('!!! energyAvailable has failed. energyAvailable: ' + energyAvailable);
    }

  });

};
