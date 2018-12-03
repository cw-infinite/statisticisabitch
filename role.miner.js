var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        
        //work means mining or collecting energy
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 Mining');
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('💵 Transfering');
        }
        //creep.memory.working the login works reversly very confusing but clever
        if(creep.memory.working) {


            // const containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
            //       {filter: {structureType: STRUCTURE_CONTAINER}});
            // containers[0].transfer(creep, RESOURCE_ENERGY);

            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && 
                            structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
            });

            // var targets = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType == STRUCTURE_CONTAINER && 
            //                 structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
            //     }
            // });
            // console.log(targets.length);
            if(target) {
                // console.log("test1");
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }

                // console.log("test2");
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (structure.structureType == STRUCTURE_SPAWN  && 
                            structure.energy < structure.energyCapacity) ||
                            (structure.structureType == STRUCTURE_STORAGE && 
                            structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
                        );
                    }
                });
                // console.log(targets);
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }

        else {
            




            const source = Game.getObjectById(creep.memory.source_id);
            //var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleHarvester;