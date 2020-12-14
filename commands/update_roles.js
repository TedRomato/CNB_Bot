const upDir = __dirname.replace("commands","");
const DataLayer = require(upDir + 'DataLayer.js');
const RoleHandler = require(upDir + 'RoleHandler.js');

module.exports = {
	name: 'update_roles',
	description: '[Syntax: !update_roles] Use this command after manipulation with JSON files to ensure all roles are up to date.',
	execute(message, args) {
    let profiles = DataLayer.getData("Profiles");
    for(let i = 0; i < profiles.length; i++){
      RoleHandler.updateRoles(message,profiles[i]);
    }
	},
};
