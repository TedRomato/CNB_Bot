const fs = require('fs');
const Discord = require('discord.js');
const { token,prefix } = require('./config.json');
const HandleInterval = require(__dirname + '/HandleInterval.js');
const LvlSystem = require(__dirname + '/LvlSystem.js');
const RoleHandler = require(__dirname + '/RoleHandler.js');
const DataLayer = require(__dirname + '/DataLayer.js');
const Achivement = require(__dirname + '/Achivement.js');
let interval;
let mes = null;
let updateTime = {hours:3, minutes:30};
let intervalCheck = 10 * 60 * 1000;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//////INTERVAL///////
startInterval();
//HandleInterval.handle();


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	//////INTERVAL////////
	if(command == "add_mes"){
		mes = message;
	}else if (command == "stop_mes") {
		mes = null;
	}


	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

//////INTERVAL////////
function startInterval(){
	interval = setInterval(function(){
		let now = new Date();
		if(now.getHours() == updateTime.hours && now.getMinutes() >= updateTime.minutes && now.getMinutes() < updateTime.minutes + intervalCheck/(60*1000)){
			let str = HandleInterval.handle(mes).replace(/undefined/g,"");
			mes.channel.send(str);
		}
	}, intervalCheck);
}
////////////////


client.login(token);
