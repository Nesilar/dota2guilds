let dg = require('../index');

dg.getByID(115638, guild =>{
    // console.log(guild)
    if( guild.error ) throw guild.error
    else {
        console.log(guild.data)
    }
})