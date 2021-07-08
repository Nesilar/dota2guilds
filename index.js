const https = require('https')

colors = [
    "869C9B",
    "DB261B",
    "FF7B00",
    "ECD247",
    "9ADB1B",
    "0CB34F",
    "4DC4BB",
    "3476FF",
    "996EFF",
    "DB78AA",
    "6B7B7B",
    "C98994",
    "917D9D",
    "676AC1",
    "4C91AC",
    "1F9F7A",
    "7AA154",
    "A6976C",
    "BA7A36",
    "B9523C"
]
languages = [
    "en",
    "de",
    "fr",
    "it",
    "kr",
    "es",
    "zn",
    "zn",
    "ru",
    "th",
    "ja",
    "pt",
    "pl",
    "da",
    "nl",
    "fi",
    "no",
    "sv",
    "hu",
    "cs",
    "ro",
    "tr",
    "pt",
    "bg",
    "el",
    "uk",
    "es",
    "vi"
]

async function makeRequest(url, param, callback) {
    let guild

    let req = https.get(url, res => {
        let data = []

        res.on('data', chunk => {
            data.push(chunk)
        });

        res.on('end', () => {
            let json

            try {
                json = JSON.parse(Buffer.concat(data).toString())
            } catch (error) {
                return callback( { error } )
            }

            if(param.type === "id") {
                if(!json.success) return callback( { error: `Can't find guild with guild id '${param.id}'` } )
                if(json.summary) {
                    guild = json.summary
                    guild.guild_info.guild_id = param.id
                }
            } 
            else if(param.type === "tag") {
                if(json.found_guild.result === 1) {
                    guild = json.found_guild.guild_summary
                    guild.guild_info.guild_id = json.found_guild.guild_id
                } 
                else if(json.found_guild.result === 5) {
                    return callback({ error: "Tag must be 1-5 symbols long" })
                } 
                else if(json.found_guild.result === 6) {
                    return callback( { error: `Can't find guild with guild tag '${param.tag}'` } )
                }
            }

            guild.guild_info.guild_language = languages[guild.guild_info.guild_language]
            guild.guild_info.guild_primary_color = colors[guild.guild_info.guild_primary_color]
            guild.guild_info.guild_secondary_color = colors[guild.guild_info.guild_secondary_color]
            callback( { data: guild } )
        });
    })
    req.on('error', err => {
        callback( { error: err.message } )
    })    
}

class Dota2Guilds {

    getByID(id, callback) {
        if( !Number.isInteger( Number(id) ) ) return callback({ error: "ID must be Integer" })
        let url = `https://www.dota2.com/webapi/IDOTA2Guild/GetGuildSummary/v0001/?guild_id=${id}`
        makeRequest(url, { type: "id", id }, callback)
    }

    getByTag(tag, callback) {
        let url = `https://www.dota2.com/webapi/IDOTA2Guild/FindGuildByTag/v0001/?tag=${encodeURIComponent(tag)}`
        makeRequest(url, { type: "tag", tag }, callback)
    }
    
}

module.exports = new Dota2Guilds();