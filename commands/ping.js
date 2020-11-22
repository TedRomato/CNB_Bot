const upDir = __dirname.replace("commands","");
const dataLayer = require(upDir + 'DataLayer');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		console.log(dataLayer.getDataPieceCondition('Issues','{ "id":"1" }',));
	},
};
