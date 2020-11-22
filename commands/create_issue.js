const upDir = __dirname.replace("commands","");
const Issues = require(upDir + "Issue.js");
const DataLayer = require(upDir + "DataLayer.js");


module.exports = {
	name: 'create_issue',
	description: 'creates a new issue',
	execute(message, args) {
    for(let i = 3; i < args.length; i++){
      args[2] += " " + args[i];
    }
		let issue = new Issues.Issue();
		issue.setName(args[0]);
		issue.setAwardPoints(args[1]);
		issue.setDescription(args[2]);
		let arr = DataLayer.getData('Issues');
		arr.push(issue);
		DataLayer.saveData('Issues', arr);

  }
};
