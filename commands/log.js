const upDir = __dirname.replace("commands","");
const Logs = require(upDir + "Log.js");
const DataLayer = require(upDir + "DataLayer.js");
const Profiles = require(upDir + "Profile.js");
const RoleHandler = require(upDir + "RoleHandler.js");
const Achivements = require(upDir + "Achivement.js");

module.exports = {
	name: 'log',
	description: '[Syntax:!log /*Here goes description of what you did*/] Use this command to to help you and others keep track of your work (on issue you are currently solving), and get rewarded with 5 points for each log + for every consecutive day, you get additional points.',
	execute(message, args) {

    for(let i = 1; i < args.length; i++){
      args[0] += " " + args[i];
    }

		let str = "";

    let logs = DataLayer.getData('Logs');
		let profiles = DataLayer.getData('Profiles');

		let profileIndex = DataLayer.indexOfFirst('Profiles', {"ID":message.member.id });
		let profile = Profiles.dataToProfile(profiles[profileIndex]);

		let issueAssigned = profile.currentIssue;
		if(issueAssigned == "null"){
			message.channel.send("Start solving some issue before logging. No log made.");
			return;
		}

		let newLog = new Logs.Log(message.member.user.tag, message.member.id);
		newLog.profile = message.member.id;
    newLog.issue = issueAssigned;
    newLog.content = args[0];
		logs.push(newLog);

		profile.logs.push(newLog.ID);

		let issues = DataLayer.getData("Issues");

		issues[DataLayer.indexOfFirst("Issues", {ID:issueAssigned})].logs.push(newLog.ID);

		DataLayer.saveData("Issues", issues);

		if(profiles[profileIndex].logMade == false){
			if(profiles[profileIndex].logStreak > 0){
				str = message.member.user.tag + " just made first log of the day, and gets " + Logs.streakMultiplier*profile.logStreak + " additional points for " + profiles[profileIndex].logStreak + " days on log streak\n";
			}
			str += profile.addPoints(Logs.streakMultiplier*profile.logStreak, "b");
			profile.logStreak ++;
			profile.logMade = true;
		}

		str += "*" + message.member.user.tag + "* gets " + Logs.logAward + " points for log.\n";

		str += profile.addPoints(Logs.logAward, "b");

		RoleHandler.updateRoles(message, profile)

		message.channel.send("*" + message.member.user.tag + "* has added a new log \n" + newLog.getLogInfo() + "\n" + str.replace(/undefined/g,""));

		let achivements = Achivements.checkForNewAchivements(profile);
		for(let i = 0; i < achivements.length; i++){
			message.channel.send(message.member.user.tag + " has unlocked a new achivement: " + achivements[i].getInfo());
			profile.achivements.push(achivements[i].ID)
		}
		profiles[profileIndex] = profile;

		DataLayer.saveData('Profiles', profiles);
		DataLayer.saveData('Logs', logs);

	},
};
