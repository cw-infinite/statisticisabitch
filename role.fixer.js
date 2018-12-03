var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        creep.say('🏗️');

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('🏗️ repair');
        }

        if(creep.memory.working) {
        
            var repairs = creep.room.find(FIND_STRUCTURES, {
                filter:  (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.hits < structure.hitsMax);
                }
            });

            repairs.sort((a,b) => a.hits - b.hits);

            if(repairs.length > 0) {

                if(creep.memory.target){
                    let t = Game.getObjectById(creep.memory.target);
                    if(creep.repair(t) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(t);
                    }
                    else if (creep.repair(t) == ERR_NOT_ENOUGH_RESOURCES){
                        creep.memory.target = null;
                    }
                }
                else{
                    if(creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                        creep.memory.target = repairs[0].id;
                        creep.moveTo(repairs[0]);
                    }
                }

                // if(creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(repairs[0]);
                // }
            }
            else{
                repairs = creep.room.find(FIND_STRUCTURES, {
                    filter:  (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD &&
                                Math.floor(structure.hits/structure.hitsMax*100) < 50);
                    }
                });

                repairs.sort((a,b) => a.hits - b.hits);

                if(repairs.length > 0) {
                    if(creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairs[0]);
                    }
                }
                else{
                    repairs = creep.room.find(FIND_STRUCTURES, {
                        filter:  (structure) => {
                            return structure.hits < structure.hitsMax;
                        }
                    });

                    repairs.sort((a,b) => a.hits - b.hits);

                    if(repairs.length > 0) {
                        if(creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(repairs[0]);
                        }
                    }
                }
            }
        
        }
        else {
            
            
    
            // if container exist. and 
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE ) &&
                            structure.store[RESOURCE_ENERGY] > 0);
                }
            });
            
            // console.log(targets);
            if(target) {
                if(creep.memory.dest){
                    let t = Game.getObjectById(creep.memory.dest);
                    if(creep.withdraw(t, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(t);
                    }
                    else{
                        creep.memory.dest = null;
                    }
                }
                else{
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.memory.dest = target.id;
                        creep.moveTo(target);
                    }
                }

            }
            else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }


            
            
        }
    }
};

module.exports = roleBuilder;