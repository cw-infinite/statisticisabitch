
// require('prototype.spawn')();


var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleMiner = require('role.miner');
var roleFixer = require('role.fixer');



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

var testing = function (miners, spawn_name) {
    // console.log(spawn_name);
    //creep.memory.sourceId = Game.spawns['Spawn1'].pos.findClosestByRange(FIND_SOURCES).id;
    var targets = Game.spawns[spawn_name].room.find(FIND_SOURCES);
    // creep.room.lookForAtArea(LOOK_STRUCTURES,10,5,11,7);
    targets.sort(function(a, b){return a.id-b.id;});

    if(miners.length  == 0) return targets[0].id;

    //at least one
    for(var t in targets){

        var pos = targets[t].pos;

        var area = Game.spawns[spawn_name].room.lookAtArea(pos.y-1,pos.x-1,pos.y+1,pos.x+1,true);

        // console.log(spawn_name);

        //get containers 
        var cons = _.filter(area, (point) => {

            if(point.type == 'structure' && 
               (point.structure && point.structure.structureType == 'container')){
                return true;
            }
            //if there are structure container || creep && miner then
            // 
            return false;
        });

        // console.log(cons[0].structure.structureType);
        // console.log(cons[0].x);
        // console.log(cons[0].y);



        //get miners
        var mins = _.filter(area, (point) => {

            if(point.type == 'creep' && 
               (point.creep && point.creep.memory.role == 'miner')){
                return true;
            }
            //if there are structure container || creep && miner then
            // 
            return false;
        });

        // console.log(mins);
        var index= null;
        //ex
        // {x: 6, y: 11, type: 'structure', structure: {...}},
        // {x: 5, y: 10, type: 'creep', creep: {...}},
        for (var i in cons){

            for(var j in mins){
                if(cons[i].x == mins[j].x && cons[i].y == mins[j].y){
                    index = null;
                    break;
                }
                else{
                    index = true;
                }
            }
            if(index) return targets[t].id;
        }

    }

    return -1;
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
// var control_level = Game.spawns['Spawn1'].room.controller.level;


module.exports = {
    
    manageCreeps: function(cfg){

        // console.log();
        
        //level one unit conftrol
        var units = cfg.unit_control;

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
        
        var role_name = "";
        var spawn_cw = Game.spawns[cfg.spawn_name];

        // var totalEnergy = Game.spawns[spawn_name].room.energyAvailable;

        // console.log("---:" + cfg.spawn_name);
        // console.log('Spawning new harvester: ' + units.h_carry);
        //console.log(harvesters.length + "" + units.h_num_min);

        //harvesters first
        if(harvesters.length < units.h_num_min) {

            role_name= 'harvester';
            // console.log('Spawning new harvester: ' + units.h_carry);
            spawn_cw.createCustomCreep(role_name);

        }
        else{
            // console.log(cfg.spawn_name);
            if(upgraders.length < units.u_num_min) {

                role_name =  'upgrader';
                // console.log('Spawning new harvester: ' + creep_name);
                spawn_cw.createCustomCreep(role_name);
            }
            if( builders.length < units.b_num_min ) {

                role_name =  'builder';
                spawn_cw.createCustomCreep(role_name);

            }
             // console.log(miners.length);

            if( miners.length < units.m_num_min ) {

                role_name =  'miner';
                spawn_cw.createCustomCreep(role_name);

            }

            if( fixers.length < units.f_num_min ) {

                role_name =  'fixer';
                spawn_cw.createCustomCreep(role_name);

            }
        }
        
        // console.log(testing(miners, cfg.spawn_name));

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
            if(creep.memory.role == 'fixer') {
                roleFixer.run(creep);
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
    },

    manageTowers: function(cfg){

        var spawn_cw = Game.spawns[cfg.spawn_name];

        var towers = spawn_cw.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_TOWER
        });


        for (let tower of towers) {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            // console.log(tower.id);
            if (target != undefined) {
                tower.attack(target);
            }
        }

    }





    
    
};