function hello () { 
  if(targets.length > 0) {
        for (var i in targets){

            var spos = targets[i].pos;
            var x1 = spos.x-1, y1 = spos.y-1, x2 = spos.x+1 , y2 = spos.y+1; 
            // console.log("xy:" + x1 +" "+ x2);
            var area = creep.room.lookForAtArea(LOOK_CREEPS,x1,y1,x2,y2,true);

            // area.keys(obj).forEach(key => {
            //   let value = obj[key];
            //   //use key and value here
            // });



            // const SOME_STRUCTURE_I_WANT = STRUCTURE_ROAD;

            var lookForStructure = creep.room.lookForAtArea(LOOK_CREEPS,x1,y1,x2,y2,true);

            for (creep in lookForStructure) {
                var testStructure = _.filter(lookForStructure[creep], { "role": "miner" });
                if (testStructure != "") {
                    console.log("_filter found: ?");
                    console.log("testStructure: " + testStructure);
                }
            }

            /* TIMER for .findInRange AND filtered */
            // startCpu = Game.cpu.getUsed();
            // const closeStructure = creep.pos.findInRange(FIND_STRUCTURES, 3, {
            //     filter: (c) => {
            //         return c.structureType == SOME_STRUCTURE_I_WANT;
            //     }
            // });
            // elapsed = Game.cpu.getUsed() - startCpu;
            // console.log("testStructure: " + closeStructure);

            // for (var key in area) {
            //     var area2 = area[key];
            //   for (var key2 in area2) {
            //       console.log(key2, area2[key2]);
            //     }
            // }
            if (area){
                console.log("helleo inside");

                console.log(typeof area);


                for(var ind in area){
                    // area[ind].creep
                    
                    console.log("helleo?????");
                }
                // creep.room.lookAt(s.pos)
            }
            else{
                console.log("helleo");
            }
        }
    }
}
