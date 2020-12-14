const upDir = __dirname.replace("commands","");
const Issues = require(upDir + "Issue.js");
const DataLayer = require(upDir + "DataLayer.js");


module.exports = {
	name: 'create_issue',
	description: '[Syntax: !create_issue /*Issue name*/ /*Points awarded*/ /*Points drop*/ /*Issue detailed description*/] Creates a new issue, that anyone can pick up, adn start solving. Try to divide more complex issues into smaller subissues.',
	execute(message, args) {
    for(let i = 4; i < args.length; i++){
      args[3] += " " + args[i];
    }
		let issue = new Issues.Issue();
		issue.setName(args[0]);
		issue.setAwardPoints(parseInt(args[1]));
		issue.setPointsDrop(parseInt(args[2]));
		issue.setDescription(args[3]);
		let arr = DataLayer.getData('Issues');
		arr.push(issue);
		message.channel.send("New issue has been created: \n" + issue.getIssueAsString());
		DataLayer.saveData('Issues', arr);
  }
};
