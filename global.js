

//naming convention separated by '_'

var global = {

    spawn_name : "Spawn1",

    unit_roles : ["harvester", "builder", "upgrader", "miner"],

    unit_control:{
        h_num_min : 3,
        u_num_min : 3,
        b_num_min : 4,
        m_num_min : 6,
        f_num_min : 2
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