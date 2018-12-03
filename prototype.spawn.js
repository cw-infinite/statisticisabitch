
//spawn_cw = Game.spqwns.Spanw1.room
var getSource = function (miners, spawn_cw) {
    // console.log(spawn_name);
    //creep.memory.sourceId = Game.spawns['Spawn1'].pos.findClosestByRange(FIND_SOURCES).id;
    var targets = spawn_cw.find(FIND_SOURCES);
    // creep.room.lookForAtArea(LOOK_STRUCTURES,10,5,11,7);
    targets.sort(function(a, b){return a.id-b.id;});

    if(miners.length  == 0) return targets[0].id;

    //at least one
    for(var t in targets){

        var pos = targets[t].pos;

        var area = spawn_cw.lookAtArea(pos.y-1,pos.x-1,pos.y+1,pos.x+1,true);

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



// if(log) console.log("");

var log = true;

module.exports = function (){
StructureSpawn.prototype.createCustomCreep = function(role_name){
    // var numberOfParts = Math.floor(energy / 200);
    var body = [];
    var creep_name;
    var energy = this.room.energyAvailable;
    var num_carry = 0;
    var num_work = 0;
    var num_move = 0;
    var memory_cw = {

        role: role_name,
        working: false

    }
    var is_limit_okay = false;
    /*
    var num_
    var num_
    var num_
    var num_
    var num_
    var num_
    var num_
    */
    var energyNeed = 0;

    

    switch(role_name){
        case "harvester":
            //first thing to thing about. need 1 work =100
                // x = need eng = 100 +
            // var egy = enegy - 100;

            if(energy < 200) break;
            // .role = 'harvester';
            creep_name = 'H-' + Game.time;


            var base = Math.floor((((energy-100)/2)/50));
            num_work = 1;
            num_carry = base;
            num_move = base;
            is_limit_okay = ((num_move+num_carry+num_work) >= 3 ? true : false);
            break;
        case "miner":
            //work = carry x 2 
            //move = work / 2 
            if(energy < 350) break;

            var containers = this.room.find(FIND_STRUCTURES,{
                filter: function(s) {
                    return s.structureType == STRUCTURE_CONTAINER;
                }
            });

            if(containers.length == 0) break;

            creep_name = 'M-' + Game.time;

            //at least 300
            var base = Math.floor(energy/350);
            num_carry = base * 2;
            num_work = base * 2;
            num_move = base;

            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            var source_id = getSource(miners, this.room);

            console.log(source_id);

            if(source_id == -1){
                break;
            }
            else{
                memory_cw.source_id = source_id;
            
                is_limit_okay = ((num_move+num_carry+num_work) >= 5 ? true : false);
            }
            
            break;
        case "builder":

            if(energy < 200) break;

            creep_name = 'B-' + Game.time;

            var base = Math.floor(energy/200);
	         num_work = base;
	         num_carry = base;
	         num_move = base;

            is_limit_okay = ((num_move+num_carry+num_work) >= 3 ? true : false);

            break;
        case "upgrader":

            if(energy < 200) break;
            //base = 

            creep_name = 'U-' + Game.time;

            var base = Math.floor(energy/200);
	         num_work = base;
	         num_carry = base;
	         num_move = base;

            is_limit_okay = ((num_move+num_carry+num_work) >= 3 ? true : false);
            break;
        case "fixer":
            if(energy < 400) break;

            creep_name = 'F-' + Game.time;

            var base = Math.floor(energy/200);
             num_work = base;
             num_carry = base;
             num_move = base;

            is_limit_okay = ((num_move+num_carry+num_work) >= 6 ? true : false);

            break;
        case "":
            break;
        case "":
            break;
        default:
            break;

        }

        if(is_limit_okay){
            // console.log("ok lets test");
            // console.log(body);
            // console.log(num_work);
            // console.log(num_move);
            // console.log(num_carry);
            // console.log(creep_name);

            for (var i = 0; i < num_work; i++) {
                body.push(WORK);
            }
            for (var i = 0; i < num_carry; i++) {
                body.push(CARRY);
            }
            for (var i = 0; i < num_move; i++) {
                body.push(MOVE);
            }

            return this.spawnCreep(body, creep_name, 
            {
                memory: memory_cw
            });

        }
        else{
            return ERR_NOT_ENOUGH_ENERGY;
        }

    // return this.createCreep(body, undefined, { roel: role_name, state: false});
};
};