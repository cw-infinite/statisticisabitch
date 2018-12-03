//Creeps Control Center
// var ccc = require('CCC');
require('prototype.spawn')();

var global = require('global');
var control_center = require('control.center');





// console.log(control_level );
var find_max_storage = function (){
    //find all the structures with stroage 
    //list structures that ccan hold storage
    //return sum

};



module.exports.loop = function () {
    
    // console.log("controller level is : " + Game.spawns['Spawn1'].room.controller.level);    
    
    //global level control of the room and swpan.

    for(var i in Memory.creeps) {

	    if(!Game.creeps[i]) {
	        delete Memory.creeps[i];
	    }
	}

    //1

    // testing();
    // console.log(test('harvester', Game.spawns.Spawn1));
    //set varioius flags
    // control_center.setFlags(global);


    
    control_center.manageCreeps(global);

    //2

    control_center.manageTowers(global);

}