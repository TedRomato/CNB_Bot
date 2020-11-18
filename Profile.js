const fs = require('fs');
const editJsonFile = require("edit-json-file");

class Profile {
  constructor(nameTag, profileID) {
    this.nameTag = nameTag;
    this.ID = profileID;
    this.rank = undefined/*get lowest rank*/;
    this.rankPoints = 0;
    this.xp = 0;
    this.lvl = 0;
    this.achivments = [];
    this.logs = [];
    this.completedIssues = [];
    this.currentIssue = undefined;
    this.logStreak = 0;
    }
    newAchivement(achivement){
      this.achivments.push(achivement);
    }
    hasAchivement(achivementID){
      for(let i = 0; i < this.achivments.length; i++){
        if(this.achivments[i].ID == achivementID){
          return true;
        }
      }
      return false;
    }
}

function saveProfiles(profiles){
  let file = editJsonFile(__dirname + "/Profiles.json");
  file.set("profiles", JSON.stringify(profiles));
  file.save();
}

function addNewProfile(newProfile){
  let profiles = getProfiles();
  profiles.push(newProfile);
  saveProfiles(profiles);
}

function hasRegisteredProfile(id){
  let profiles = getProfiles();
  for(let i = 0; i < profiles.length; i++){
    if(profiles[i].ID == id){
      return true;
    }
  }
  return false;
}

function getProfileFromTag(profileTag){
  let profiles = getProfiles();
  for(let i = 0; i < profiles.length; i++){
    if(profiles[i].nameTag == profileTag){
      return profiles[i];
    }
  }
  return null;
}

function getProfiles(){
  let file = editJsonFile(__dirname + "/Profiles.json");
  let profiles = JSON.parse(file.get("profiles"));
  return profiles;
}


function getProfileFromID(profileID){
  let profiles = getProfiles();
  for(let i = 0; i < profiles.length; i++){
    if(profiles[i].ID == profileID){
      return profiles[i];
    }
  }
  return null;
}

function findIDFromTag(profileTag){
  let profiles = getProfiles();
  profiles.push(newProfile);
  for(let i = 0; i < profiles.length; i++){
    if(profiles[i].nameTag == profileTag){
      return profiles[i].ID;
    }
  }
  return null;
}

function getProfileInfo(profileTag){
  let profile = getProfileFromTag(profileTag);
  let str = "*Name:* **" + profile.nameTag
          + "**\n*Rank:* **" + profile.rank
          + "**\n*Rank Points:* **" + profile.rankPoints
          + "**\n*Lvl:* **" + profile.lvl
          + "**\n*XP:* **" + profile.xp
          + "**\n*Achivements Completed:* **" + profile.achivments.length
          + "**\n*Current Issue:* **" + profile.currentIssue
          + "**\n*Completed Issues:* **" + profile.completedIssues.length
          + "**\n*Current log streak:* **" + profile.logStreak + "**";
  return str;
}

function profileFromNonClass(object){
  let profile = new Profile(object.nameTag, object.ID);

  profile.rank = object.rank;
  profile.rankPoints = object.rankPoints;
  profile.xp = object.xp;
  profile.lvl = object.lvl;
  profile.achivments = object.achivments;
  profile.logs = object.logs;
  profile.completedIssues = object.completedIssues;
  profile.currentIssue = object.currentIssue;
  profile.logStreak = object.logStreak;

  return issue;
}

function changeProfile(changedProfile){
  let profiles = getProfiles();
  for (var i = 0; i < profiles.length; i++) {
    if(profiles[i].ID == changedProfile.ID){
      profiles[i] = changedProfile;
      saveProfiles(profiles);
      return true;
    }
  }
  return null;
}




module.exports = {Profile, addNewProfile, hasRegisteredProfile, getProfileInfo, getProfileFromID, saveProfiles, getProfiles, changeProfile};
