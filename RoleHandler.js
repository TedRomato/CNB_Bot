const DataLayer = require(__dirname + "/DataLayer.js");
const RankSystem = require(__dirname + "/RankSystem.js");
const ranks = RankSystem.rankSystem;


const roleColors = [{
    "Type": "Rank",
    "Color": "rankColor"
  },
  {
    "Type": "Lvl",
    "Color": "#c500ea"
  },
  {
    "Type": "XP",
    "Color": "#1fa502"
  },
  {
    "Type": "Rank points",
    "Color": "#0b6b64"
  }
];


/*
async function updateRoles(message) {
  console.log("-----------------");
  deleteRoles(message).catch((err) => {
    console.log("Error: " + err);
  }).then(setUpRoles(message)).catch((err) => console.log("Error: " + err));
}*/

function addRoles(message, profile) {
  return new Promise(async function(resolve, reject) {
    let roles = profile.roles;
    for (let i = 0; i < roles.length; i++) {
      console.log(roles[i]['type']);
      console.log(profile[roles[i]['parameter']]);
      let Role = await message.guild.roles.create({
        data: {
          name: roles[i]['type'] + ": " + profile[roles[i]['parameter']],
          color: selectColor(roles[i]['type'], profile)
        }
      }).catch((e) => console.error(`Couldn't create role. | ${e}`));

      message.member.roles.add(Role).catch((e) => {
        console.error(`Couldn't add role. | ${e}`);
      }).then(() => {
        roles[i].roleID = Role.id;
        if(i == roles.length-1){
          resolve(roles);
        }
      }).catch((e) => console.error(`Couldn't add role id. | ${e}`));
    }
  });
}


function updateRoles(message, profile) {
  let role;
  for(let i = 0; i < profile.roles.length; i++){
    role = message.guild.roles.cache.get(profile.roles[i]["roleID"]);
    role.edit({
      name: profile.roles[i]['type'] + ": " + profile[profile.roles[i]['parameter']],
      color: selectColor(profile.roles[i]['type'], profile)
    })
  }
}


function deleteRoles(message)  {
  message.guild.roles.cache.forEach(role => {
    if(role.name != "Admin" && role.name != "LogBot") {
      role.delete().then(() => console.log('finished deleting: ' + role.name));
    }
  });
}


/*
async function addRole(message, name, value, profile) {
  const Role = await message.guild.roles.create({
    data: {
      name: rolesSetUp[i]['Type'] + ": " + profile[rolesSetUp[i]['Parameter']],
      color: selectColor(rolesSetUp[i]['Color'], profile)
    }
  }).catch((e) => console.error(`Couldn't create role. | ${e}`));;
  message.member.roles.add(Role).catch((e) => console.error(`Couldn't add role. | ${e}`)).then(() => {
    console.log('finished Creating: ' + rolesSetUp[i]['Type']);
  });
}
*/

function selectColor(type, profile) {
  for (let i = 0; i < roleColors.length; i++) {
    if (type == roleColors[i]['Type']) {
      if (roleColors[i]['Color'] == "rankColor") {
        for (let x = 0; x < ranks.length; x++) {
          if (ranks[x]['RankName'] == profile.rank) {
            console.log(ranks[x]['RankName'] + " " + ranks[x]['Color']);
            return ranks[x]['Color'];
          }
        }
      } else {
        return roleColors[i]['Color'];
      }
    }
  }
}

module.exports = {
  addRoles,
  deleteRoles,
  updateRoles
};
