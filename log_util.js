

//naming convention separated by '_'

var global = {

    spawn_name : "Spawn1",

    unit_roles : ["harvester", "builder", "upgrader", "miner"],

    unit_control_temp:{
        h_num_min : 3,
        u_num_min : 1,
        b_num_min : 1
    },
    //work 100 carry 50 move 50
    unit_control: 
    {
        harv_num_min : 3,
        upgr_num_min : 4,
        buil_num_min : 4,
        mine_num_min : 2
    },

    flag_name : ["RED","BLUE"],

    build_config:[
    {
        role: 'harvester'

    }

    ],


    work : function (fuk){
        // console.log(fuk);
    }
};

module.exports = global;