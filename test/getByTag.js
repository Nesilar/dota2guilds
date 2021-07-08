let dg = require('../index');

dg.getByTag("L C", guild =>{
    // console.log(guild)
    if( guild.error ) throw guild.error
    else {
        console.log(guild.data)
    }
})