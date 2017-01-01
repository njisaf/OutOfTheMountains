# OutOfTheMountains

## TODO

* Move full harvesters away from energy source before they detect where to go;
* Work out how to upgrade walls;

## dataList

* create roles as categories in rooms;
* loop over these categories, grab the name, execute role based on that;
  * Can I use lodash or whatever to do it using roles as currently conceived?
    * what if we eg had a function that took an array for numbers, and then looped over the creep list for the room, yeah?
      * we just need to moderate the number of creeps associated with a room in that case. Fine, let's try that. I don't know if these things operate by reference or whatever.
