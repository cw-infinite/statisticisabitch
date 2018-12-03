
require('prototype.spawn')();


var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleMiner = require('role.miner');



// var getSources = Game.spawns['Spawn1'].room.find(FIND_SOURCES, {
//     filter: (source) => {
//         return source.id;
//     }

//     // creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).id;
//     // const source = Game.getObjectById(creep.memory.sourceId);
// });

// var getSources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);

var getSource = function (miners, spawn_name) {
    // console.log(spawn_name);
    //creep.memory.sourceId = Game.spawns['Spawn1'].pos.findClosestByRange(FIND_SOURCES).id;
    var targets = Game.spawns[spawn_name].room.find(FIND_SOURCES);

    targets.sort(function(a, b){return a.id-b.id;});

    // console.log(miners);
    // the reason we use double loop is because sample size is so small (always will be less than 10 I bet)
    if(miners.length){
        for(var t in targets){

        // console.log(targets[t].id);
        // var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            for(var m in miners){
                var si = "" + miners[m].memory.source_id;
                var ti = "" + targets[t].id;
                // console.log(si, ti);
                if(si != ti){
                    // console.log(targets[t].id);
                    return targets[t].id;
                }
            }
        // if(!miners){
        //     return targets[t].id;
        // }
    }

    }
    else{
        return targets[0].id;
    }
    
    
};



// console.log("");
//console.log(getSources);
// if(targets.length > 0) {
//     if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//     }
// }
// for(const i in builders) {
//         builders[i].memory.role = 'harvester';
//         console.log("changed!");
//     }
module.exports = {
    
    manageCreeps: function(cfg, level){

        // console.log();
        
        //level one unit conftrol
        var units = cfg.unit_control;

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        
        var role_name = "";
        var spawn_cw = Game.spawns["Spawn1"];
        // var totalEnergy = Game.spawns[spawn_name].room.energyAvailable;
        // getSource(miners, cfg.spawn_name);
        // console.log("---:" + cfg.spawn_name);
        // console.log('Spawning new harvester: ' + units.h_carry);
        //console.log(harvesters.length + "" + units.h_num_min);
        if(harvesters.length < units.h_num_min) {
            role_name= 'harvester';
            // console.log('Spawning new harvester: ' + units.h_carry);

            spawn_cw.createCustomCreep(role_name);

        }
        else{
            console.log(cfg.spawn_name);
            if(upgraders.length < units.u_num_min) {
                role_name =  'upgrader';
                // var creep_name = 'U-' + Game.time;
                // console.log('Spawning new harvester: ' + creep_name);
                spawn_cw.createCustomCreep(role_name);
            }
            if( builders.length < units.b_num_min ) {
                role_name =  'builder';
                // var creep_name = 'B-' + Game.time;
                spawn_cw.createCustomCreep(role_name);

            }
             // console.log(miners.length);

            if( miners.length < units.m_num_min ) {

                var sourceId = getSource(miners, cfg.spawn_name);
                // var creep_name = 'M-' + Game.time;
                role_name =  'miner';
                spawn_cw.createCustomCreep(role_name);

            }
        }
        
        
        if(Game.spawns[cfg.spawn_name].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns[cfg.spawn_name].spawning.name];
            Game.spawns[cfg.spawn_name].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[cfg.spawn_name].pos.x + 1, 
                Game.spawns[cfg.spawn_name].pos.y, 
                {align: 'left', opacity: 0.8});
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
        }



    },


    setFlags: function(cfg){
        var getSources = Game.spawns[cfg.spawn_name].room.find(FIND_SOURCES);
        // getSources[]
        for (var i = 0; i < getSources.length; i++) {
            // var 
            Game.flags[cfg.flag_name[i]].setPosition(getSource,20);
        }
    }





    
    
};