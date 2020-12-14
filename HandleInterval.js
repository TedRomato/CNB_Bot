const DataLayer = require(__dirname + '/DataLayer.js');
let moment = require('moment');
const Issues = require(__dirname + '/Issue.js');
const Profiles = require(__dirname + '/Profile.js');
const RoleHandler = require(__dirname + '/RoleHandler');


function handle(message) {
  let str = Profiles.rankSubtract + " points have been subtracted from issues being solved and ranks.\n";
  str += subtractRankPoints(message);
  str += handleLogStreak();

  return str;
}



function handleLogStreak() {
  let str = "";
  let profiles = DataLayer.getData('Profiles');
  let logs = DataLayer.getData('Logs');
  for(let i = 0; i < profiles.length; i++){
    if(profiles[i].logMade == false){
      if(profiles[i].logStreak > 0){
        str += "*" + profiles[i].nameTag + "*"  + "'s log streak has ended.";
      }
      profiles[i].logStreak = 0;
    }else{
      profiles[i].logMade = false;
    }
  }
  DataLayer.saveData('Profiles',profiles);
  return str;
}

function subtractRankPoints(message) {
  let str = "";
  let profiles = DataLayer.getData('Profiles');
  for(let i = 0; i < profiles.length; i++){
    let profile = Profiles.dataToProfile(profiles[i]);
    str += profile.addPoints(-Profiles.rankSubtract, 'r');
    RoleHandler.updateRoles(message, profile);
    if(profile.rankPoints < 0){
      profile.rankPoints = 0;
    }
    profiles[i] = profile;
  }
  /////Subtract from issues
  let issues = DataLayer.getData('Issues');
  for(let i = 0; i < issues.length; i++){
    if(issues[i].state == Issues.state2){
      issues[i].awardXP -= issues[i].pointsDrop;
    }
  }
  DataLayer.saveData('Issues', issues);
  DataLayer.saveData('Profiles', profiles);
  return str;
}



module.exports = {handle}
