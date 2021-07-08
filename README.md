# dota2guilds
## Get information about Dota2 guilds

## Installation
```sh
npm i dota2guilds
```

## Usage
```js
const dg = require('dota2guilds')

dg.getByID(115638, guild => {
    if( guild.error ) throw guild.error
    else {
        console.log(guild.data)
    }
})

dg.getByTag("L C", guild => {
    if( guild.error ) throw guild.error
    else {
        console.log(guild.data)
    }
})
```

## Result object example
```js
{
  guild_info: {
    guild_name: 'Loud Cowboys',   
    guild_tag: 'L C',
    created_timestamp: 1590500903,
    guild_language: 'ru',
    guild_flags: 0,
    guild_logo: '1028456111586489737',
    guild_region: 8,
    guild_chat_group_id: '13644205',
    guild_description: 'Фанаты жизни (нет)',
    default_chat_channel_id: '44549976',
    guild_primary_color: 'ECD247',
    guild_secondary_color: '676AC1',
    guild_pattern: 9,
    guild_refresh_time_offset: 101700,
    guild_required_rank_tier: 0,
    guild_motd_timestamp: 1590501323,
    guild_motd: 'Welcome to the club, buddy *slap sound*',
    guild_id: 115638
  },
  member_count: 23,
  event_points: [
    {
      event_id: 19,
      guild_points: 55620,
      guild_weekly_rank: 11297,
      guild_weekly_percentile: 81,
      guild_current_percentile: 80
    }
  ]
}
```
