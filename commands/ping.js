module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send("```diff\n+Here's some green colored text!\n```");
	},
};
