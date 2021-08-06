const noblox = require('noblox');
const Discord = require('discord.js');
const client = new Discord.Client();
const token = ""; // 토큰

client.on('message', msg => {
	if (msg.content.startsWith('!정보') && msg.content.split(' ')[1]) {
		noblox
			.getIdFromUsername(msg.content.split(' ')[1])
			.then(id => {
				noblox
					.getPlayerInfo(id)
					.then(info => {
						console.log(info);
						const embed = new Discord.MessageEmbed();
						embed.setThumbnail(
							`http://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&username=${
								info.username
							}`
						);
						embed.setColor('00ff00');
						embed.setTitle(`${info.username}님의 정보`);
						embed.addField('**이름**', info.username);
						embed.addField(
							'**생성일**',
							JSON.stringify(info.joinDate)
								.split('"')[1]
								.split('T')[0]
						);
						embed.addField('**밴여부**', JSON.stringify(info.isBanned));
						embed.addField('**친구 수**', info.friendCount);
						embed.addField('**팔로잉**', info.followingCount);
						embed.addField('**팔로워**', info.followerCount);
						//embed.setFooter('Made By 노끄#2557');
						msg.channel.send(embed);
					})
					.catch(err => {
						msg.reply('오류');
					});
			})
			.catch(err => {
				msg.reply('존재하지 않는 유저입니다');
			});
	}
});

client.login(token);
