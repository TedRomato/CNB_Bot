const upDir = __dirname.replace("commands","");
const Issues = require(upDir + "Issue.js");
const Logs = require(upDir + "Log.js")
const DataLayer = require(upDir + "DataLayer.js");

module.exports = {
	name: 'get_issue_logs',
	description: '[Syntax: !get_issue_logs /*issueID*/] Retuns all logs, that were made on issue.',
	execute(message, args) {
		let logs = DataLayer.getData("Logs");
    let issue = DataLayer.getDataPieceCondition("Issues", {ID:args[0]});
		for(let i = 0; i < logs.length; i++){
			for(let x = 0; x < issue.logs.length; x++){
				if(issue.logs[x] == logs[i].ID){
					message.channel.send(Logs.dataToLog(logs[i]).getLogInfo());
				}
			}
		}
  },
};
