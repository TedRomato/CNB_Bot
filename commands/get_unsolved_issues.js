const upDir = __dirname.replace("commands","");
const issues = require(upDir + "Issue.js");

module.exports = {
	name: 'get_unsolved_issues',
	description: 'displays list of unsolved issues',
	execute(message, args) {
    let unsolvedIssues = issues.getUnsolvedIssues();
		if(unsolvedIssues.length > 0){
      for(let i = 0; i < unsolvedIssues.length; i++){
        message.channel.send(unsolvedIssues[i].getIssueAsString() + "\n---------------------------------\n");
      }
    }else{
      message.channel.send('No unsolved issues at the moment...');
    }
	},
};
