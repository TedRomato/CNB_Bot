const upDir = __dirname.replace("commands","");
const DataLayer = require(upDir + 'DataLayer.js');
const Issues = require(upDir + 'Issue.js');


module.exports = {
	name: 'start_solving',
	description: 'assign me with solving issue, if I dont have any unfinished',
	execute(message, args) {
		console.log('is: ', args[0], 'pr: ', message.member.id);
		let profile = DataLayer.getDataPieceCondition("Profiles", '{"ID":"' + message.member.id + '"}');
		let issue = DataLayer.getDataPieceCondition("Issues", '{"ID":"' + args[0] + '"}');
		if(profile == null){
			message.channel.send("Your have to register first.");
		}
		else if(profile.currentIssue != null){
			message.channel.send("Your have unsolved issue.");

		}else if(issue == null){
			message.channel.send("No such issue with ID: " + args[0] + ".");

		}else if(issue.state != Issues.state1){
			message.channel.send("Issue " + issue.name + "#" + args[0] + " is not looking for solver.");

		}else{
			let profiles = DataLayer.getData('Profiles');
			let issues = DataLayer.getData('Issues');
			for(let i = 0; i < profiles.length; i++){
				if(profiles[i].ID == profile.ID){
					profiles[i].currentIssue = args[0];
				}
			}
			for(let i = 0; i < issues.length; i++){
				if(issues[i].ID == issue.ID){
					issues[i].solver = profile.ID;
					issues[i].state = Issues.state2;
				}
			}
			DataLayer.saveData("Profiles", profiles)
			DataLayer.saveData("Issues", issues)

		}
	},
};
