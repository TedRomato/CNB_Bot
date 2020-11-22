const upDir = __dirname.replace("commands","");
const Issues = require(upDir + "Issue.js");
const DataLayer = require(upDir + "DataLayer.js");

module.exports = {
	name: 'get_issues',
	description: 'displays list of unsolved issues',
	execute(message, args) {
		let data = DataLayer.getDataPieceCondition("Issues", '{"state":"' + args[0] + '"}');
		if(data == null){
			message.channel.send('No issue with such type at the moment...');
			return;
		}
    let issues = Issues.DataToIssue(data);
		if(issues.length > 0){
      for(let i = 0; i < issues.length; i++){
        message.channel.send(issues[i].getIssueAsString() + "\n---------------------------------\n");
      }
    }else{
			message.channel.send(issues.getIssueAsString());
		}
	},
};
