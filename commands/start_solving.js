const upDir = __dirname.replace("commands","");
const multipleTypeHandler = require(upDir + 'MultipleTypeHandler.js');


module.exports = {
	name: 'start_solving',
	description: 'assign me with solving issue, if I dont have any unfinished',
	execute(message, args) {
		console.log('is: ', args[0], 'pr: ', message.member.id);
		let resp = multipleTypeHandler.assignIssueToProfile(args[0], message.member.id);
		if(resp != true){
			message.channel.send(resp);
		}
	},
};
