'use strict';

//executeRole takes the creep's role string and tries to execute a .run() command based on that, by looking for a module with that role name
//Hoping I can get it to reject a 'not a function' error somehow, on the catch block. Not sure about this, let's test it.

module.exports = function(creep) {



  let role = creep.memory.role;
  let roleOrder = require('role-' + role);
  console.log('roleOrder: ', roleOrder);

  new Promise((resolve, reject) => {
    try {
      resolve(roleOrder.run());
    } catch (e) {
      reject(e);
    }

  });


};
