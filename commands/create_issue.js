const upDir = __dirname.replace("commands","");
const issues = require(upDir + "Issue.js");

module.exports = {
	name: 'create_issue',
	description: 'creates a new issue',
	execute(message, args) {
    console.log('args: ',args);
    for(let i = 3; i < args.length; i++){
      args[2] = args[2] + " " + args[i];
    }
  	issues.createIssue(args[0],args[1],args[2]);
  }
};
