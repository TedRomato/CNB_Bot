const fs = require('fs');
const editJsonFile = require("edit-json-file");
const DataLayer = require(__dirname + "/DataLayer.js");
const LvlSystem = require(__dirname + "/LvlSystem.js");
const RankSystem = require(__dirname + "/RankSystem.js");
const RoleHandler = require(__dirname + "/RoleHandler.js");
const rankSubtract = 10;

class Profile {
  constructor(nameTag, profileID) {
    this.nameTag = nameTag;
    this.ID = profileID;
    this.rank = null/*get lowest rank*/;
    this.rankPoints = 0;
    this.xp = 0;
    this.lvl = 1;
    this.achivements = [];
    this.logs = [];
    this.completedIssues = [];
    this.currentIssue = null;
    this.logStreak = 0;
    this.logMade = false;
    this.roles = [{"type":"Rank", "parameter":"rank","roleID":null},{"type":"Rank points", "parameter":"rankPoints", "roleID":null},{"type":"Lvl", "parameter":"lvl", "roleID":null},{"type":"XP", "parameter":"xp", "roleID":null}];
    this.addPoints(0,"b");
    }
    async assignNewRoles(message){
      let prof = this;
      return new Promise(async function(resolve, reject) {
        let roles = await RoleHandler.addRoles(message, prof).catch((e) => {console.log(`Couldn't create role. | ${e}`)});
        prof.setRoles(roles);
        resolve();
      });
    }
    setRoles(roles){
      this.roles = roles
    }
    newAchivement(achivement){
      this.achivments.push(achivement);
    }
    hasAchivement(achivementID){
      for(let i = 0; i < this.achivements.length; i++){
        if(this.achivements[i] == achivementID){
          return true;
        }
      }
      return false;
    }
    getProfileInfo(){
      let issueStr;
      try {
        issueStr = DataLayer.getDataPieceCondition("Issues", {"ID":this.currentIssue }).name + "#" +  this.currentIssue;
      } catch (e) {
        issueStr = 'none'
      }
      let lastAchivementStr;
      try{
        lastAchivementStr = "**\n*Last achivement:* **" + DataLayer.getData("Achivements",{ID:this.achivments[this.achivments.length-1]}).name
      }catch(e){
          lastAchivementStr = "";
      }
      let str = "*Name:* **" + this.nameTag
              + "**\n*Rank:* **" + this.rank
              + "**\n*Rank Points:* **" + this.rankPoints
              + "**\n*Lvl:* **" + this.lvl
              + "**\n*XP:* **" + this.xp
              + lastAchivementStr
              + "**\n*Achivements Completed:* **" + this.achivements.length
              + "**\n*Current Issue:* **" + issueStr
              + "**\n*Completed Issues:* **" + this.completedIssues.length
              + "**\n*Current log streak:* **" + this.logStreak + "**";
     return str;
   }


  //////////// // TODO: REFACTOR ADD POINTS ///////
  addPoints(points, parameter){
    let str = "";
    if(parameter == "xp" || parameter == "b"){
      let oldLvl = this.lvl;
      this.xp+=points;
      //update xp
      this.lvl = LvlSystem.getLvl(this.xp);
      if(this.lvl > oldLvl){
        str += "*" + this.nameTag + "* has reached lvl : *" + this.lvl + "*\n";
      }
    }
    if(parameter == "r" || parameter == "b"){
      let oldRank = this.rank;
      let oldRankPoints = this.rankPoints;

      this.rankPoints+=points;
      if(this.rankPoints < 0){
        this.rankPoints = 0;
      }
      //update rank
      this.rank = RankSystem.getRankName(this.rankPoints);
      if(this.rank != oldRank){
        if(this.rankPoints > oldRankPoints){
          str += "*" + this.nameTag + "* just reached : *" + this.rank + "* rank. Good job! :]\n";
        }else if(this.rankPoints < oldRankPoints){
          str += "*" + this.nameTag + "* just dropped to : *" + this.rank + "* rank. :[\n";
        }
      }
    }
    if(parameter != "xp" && parameter != "r" && parameter != "b"){
      str += "Invalid parameter " + parameter +  " in addPoints(points, parameter). Use 'xp' for adding xp or 'r' for adding rank points or use 'b' to add to both.";
      throw "Invalid parameter " + parameter +  " in addPoints(points, parameter). Use 'xp' for adding xp or 'r' for adding rank points or use 'b' to add to both.";
    }

    return str;
  }
}

function dataToProfile(data){
  if(Array.isArray(data)){
    let arr = [];
    for(let i = 0; i < data.length; i++){
      arr.push(singleDataToProfile(data[i]));
    }
    return arr;
  }else{

    return singleDataToProfile(data);
  }
}

function singleDataToProfile(Data){
  let profile = new Profile();
  for(let propt in Data){
    if(profile.hasOwnProperty(propt)){
      profile[propt] = Data[propt];
    }else{
      throw "Profile doesn't have porprety " + propt + " you are trying to assign from JSON_Data";
    }
  }
  return profile;
}




module.exports = {Profile, singleDataToProfile, dataToProfile,rankSubtract};
