# OutOfTheMountains

I am hungry and there is no food.

I certainly believe that there is an opportunity to consolidate the back-end operations of subscription-based publications like Stratechery; I do question, though, whether this is a venture-worthy business model.


## TODO

* Move full harvesters away from energy source before they detect where to go;
* Work out how to upgrade walls;
* builders also need to REPAIR structures, unless I want like another role to do that.

## The plan

* What if there was a spore creep? It basically does all required events until a certain threshold is reached when the spawn can construct larger creeps, which then begin spawning with rigidly defined roles? When we want to expand without a fight, we just start shitting spore creeps in a certain direction.
  * I like it because it's a transitional phase of development. We can develop it and get the proportionality running using a lot of the current GPU work we've done so far, and we can define a trip point that we want to reach to spawn larger creeps, and switch it over to a new mode where it attempts to match the global equilibrium goals. After that, the remaining spore creeps (which have been spawning continuously as fast as the spawn can handle) move on to try and find another base. Spore events simply occur naturally at the borders based on global conditions, eg energy above certain level, spore count quite low, aggression low, etc. Basically I want to reach a state where there's always spare CPU, always spare energy, and I'm always sending out a low level of spores. The ultimate point is to bring energy online at a relatively constant rate until no more energy nodes are left unexploited.
    * The spore stage should be easy. There are only so many spaces around the energy source, and we're rushing for a certain goal (push out a big builder and a dedicated harvester, for example, that can set up a bigger operation)
      * When we get more sophisticated, we can set up for advanced settlement plans, but this is the right path for now.

* Here's how we start: We describe where we are now, literally by saying like, "hasController: true" or some shit. So we then describe what we want to do NOW, in this state. The point is to stick to those numbers. Divide the energy, even if at current state we want 100% of energy going to construction, yeah?
  * Each role just DOES WHAT IT NEEDS TO DO to get energy to desired equilibrium. That's what defines the role. So for now, harvesters just deliver energy to the spawn, and we'll set that to be an absolute value manually while we work out the rest. Then we have builders and upgraders, and I assume that's all we need. Then we'll teach it to place structures and get fancy on energy expansion. Once we reach a certain threshold we'll start expanding. Attack/defense drones are specialized units that only exist when needed. Then there are mules to carry energy between bases. After that we'll get imaginative.
    * The unit is the room. The state of the room decides the spawn. The rooms are controlled only by the global object, which has like the equilibrium nums on it and the target coodrs for transfer or something.
  * The "setup" period occurs until maximum output is achieved on available energy sources, at constant designs, we ought to be able to determine that.


* There needs to be a state like equilibrium. Like, if we want to invest X amount of energy in maintenance of a base and Y amount in storage for defense, leaving Z for other things. If THESE numbers fall out of set proportion, it needs to trigger building/spawning decisions in the rooms. All numbers should flow down from that. Presumably, with proper design and barring attack, an energy source should have a constant output, and this should be predictable.

* The entire goal is to hoard energy. When a war comes, presumably all other things being equal, the one with the gold wins. You need to expand aggressively but avoid full scale conflict. You respond to short term threats by draining stored energy, and long term threats by moving energy towards the threat. That's the key to the game. Fortunately as far as I can see there's almost always a direction to expand in, at least early on, so we should be able to test things out.
  * How we move energy towards threats, jesus... Some sort of decision tree? I can set some values myself at the start, and worry about how to move energy between rooms first.
  * Once we have the entire thing worked out, the whole strategy can be changed by dictating the flows of energy. Wow wow wow.

* Wait are you crazy? How are you going to handle that shit?
  * What we need is a way to get numbers that are constantly increasing or decreasing to keep proportion to each other. How do we keep numbers always in proportion?
    * Okay, we set them as percentages of 100. Then we take the total number of all creeps (in room etc), discover their percentages of that number. Then we discover which deviates the most below its target number, and spawn that one. As the other numbers die off they'll fall, but we just need to ensure that we're always spawning faster than they die, which seems relatively easy.
    * Some numbers will need to be absolute, perhaps. Like, we always want three feeders per energy source, since they can only handle three at a time, or four.
      * Can we detect THAT NUMBER perhaps? That's nuts. The feeders short haul to storage tanks, and the rest feed off those storage units. This

* We should drop the GPU thing. It's clear that we need a certain number of roles for a base. We're not switching the role on a set model around, we're spawning a creep with a specific purpose. That's all we're ever going to do.
  * We are going to determine what creep each spawn should work on at that moment. We're then going to work out if it can, ie does it have sufficient energy? is it already spawning, etc. If it can, it does, to the maximum possible amount. Body parts are determined in a similar way.
    * Or perhaps an array? That would be easiest. We just leave the part where it adds the next bit hanging or something...

* TO SUM UP: For each room, we need to execute functions in proportionate fractions dependent on states in the room, and do this on an array of creep names associated with that room.
  * The problem is, what if we keep switching the roles of a creep and it's stuck going back and forth in the middle of nowhere, never getting anywhere to execute its role?
    * No, you idiot... you spawn gpus CONTINUOUSLY. You're just getting the spawner to detect what the next target gpu role is. We keep track of the numbers of each role and calculate what role should be spawned at that time. The goal will be to get enough gpus in total that it doesn't matter if a percentage is confused; they'll die off eventually. The goal is to expand to the absolute limit of energy available and continually expand into available energy. We'll need to reserve a proportion of energy for defense, since it's more efficient to spawn up rapidly in response to attacks.
* To sum up again: We need to control all info on memory. We make a pull to get basic info needed to run commands, so the name of rooms, creeps etc etc. Otherwise we're only going to be tracking energy. Each tick we track energy.

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
