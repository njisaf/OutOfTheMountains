# OutOfTheMountains

## TODO

* Move full harvesters away from energy source before they detect where to go;
* Work out how to upgrade walls;

## The plan


* TO SUM UP: For each room, we need to execute functions in proportionate fractions dependent on states in the room, and do this on an array of creep names associated with that room.
  * The problem is, what if we keep switching the roles of a creep and it's stuck going back and forth in the middle of nowhere, never getting anywhere to execute its role?

* What we need to do is tell a story. We need to take these creeps and make them run through a little script, and then detect the changes in that story, and change orders on that basis. So what I need is:
  * A way to track reliably each creep and its role, along with the desired roles.
    * The names themselves don't actually matter, except that they exist. We need only to generate based on the list. We can run the Creep.run commands DIRECTLY ON THE NAME LIST, with reference to the role list. That would skip all this shit with 'roles', completely. We just need a series of small movement chunks. Each speciality role is a different model completely.
      * on the room object, we put in memory the gpuRole array and the gpuSize array, the latter of which is the type of gpu being built, with which modules, etc, yeah? depends simply on available energy, upgrades are just handled by natural decay, perhaps.
      * What I think is, we keep it a ratio. That's easiest for this role. We build the command array each tick, pushing in the actual names of the commands that run. Then we Creep.run on the actual array on the tick! hahaha.
        * wait... why don't we just Creep.run to the proportionate extent? Fuck me, okay.
      * In globalToggles, we stick these upgrade models for the role models, so
      gpuUpgrade: {
          0: [WORK,CARRY,MOVE],
          1: [WORK,WORK,CARRY,CARRY,MOVE] etc
      }

      Or maybe for ease of access we can just bung them in the object itself! Start with that.

* Ancient lungfish must have enjoyed gulping air. They must have gotten a real high from it.
