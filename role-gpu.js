'use strict';

module.exports = {

  run: function(creep) {
    //check the creep's memory for the mission.
    let mission = Game.creeps[creep].memory.mission;
    let missionStage = Game.creeps[creep].memory.missionStage;
    let step = mission[missionStage];

    


  },


};
