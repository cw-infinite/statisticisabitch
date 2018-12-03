var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        creep.say("💡");

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.working) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // if container exist. and 
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && 
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
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }
	}
};

module.exports = roleUpgrader;