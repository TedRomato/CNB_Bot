const upDir = __dirname.replace("commands","");
const Issues = require(upDir + "Issue.js");
const Profiles = require(upDir + "Profile.js");
const DataLayer = require(upDir + "DataLayer.js");
const RoleHandler = require(upDir + "RoleHandler.js");
const Achivements = require(upDir + "Achivement.js");



module.exports = {
	name: 'issue_finished',
	description: '[Syntax: !issue_finished] Use this, if you have done all the work that issue (you are currently working one) needed. Rewards you with points.',
	execute(message, args) {
		let str = "";
    let profiles = DataLayer.getData('Profiles');
    let issues = DataLayer.getData('Issues');
    let profile = Profiles.dataToProfile(DataLayer.getDataPieceCondition('Profiles',{"ID":message.member.id}));
    let issue = DataLayer.getDataPieceCondition('Issues',{"ID":profile.currentIssue});
    if(issue == null){
      message.channel.send("You are currently solving no issue");
    }else{
      str = profile.addPoints(issue.awardPoints, "b");
      profile.completedIssues.push(profile.currentIssue);
      profile.currentIssue = null;
			message.channel.send(profile.nameTag + " just solved issue : " + issue.name + "#" + issue.ID + ".\nReward earned: " + issue.awardPoints + " points.\n" + str.replace(/undefined/g,""));
			let achivements = Achivements.checkForNewAchivements(profile);
			for(let i = 0; i < achivements.length; i++){
				message.channel.send(message.member.user.tag + " has unlocked a new achivement: " + achivements[i].getInfo());
				profile.achivements.push(achivements[i].ID)
			}
      issue.state = Issues.state3;
			RoleHandler.updateRoles(message,profile);
			profiles[DataLayer.indexOfFirst('Profiles', {"ID":message.member.id})] = profile;
      issues[DataLayer.indexOfFirst('Issues', {"ID":issue.id})] = issue;
      DataLayer.saveData('Profiles', profiles);
      DataLayer.saveData('Issues', issues);
    }
	},
};
