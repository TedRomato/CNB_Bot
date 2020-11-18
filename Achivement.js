class Achivement(){
  /* parameters are passed like ->examples ['completedIssues', 10]  ['logStreak', 2]*/
  constructor(name, parameters, xpAward){
    this.ID = /*number of achivements + 1*/;
    this.name = name;
    this.xpAward = xpAward;
    this.argToCheck = parameters[0];
    this.argScore = parameters[1];
  }
  checkIfAchived(profile){
    if(profile.[this.argToCheck] >= this.argScore){
      if(!profile.hasAchivement(this.ID)){
        profile.newAchivement(this);
      }
      return true;
    }else{
      return false;
    }
  }
}

module.exports.Achivement;
