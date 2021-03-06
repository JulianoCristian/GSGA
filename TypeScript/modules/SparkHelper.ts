
import {MatchFinishedMessage, StartedMatch, GameData, PlayerData, MatchInfo, TeamInfo, getRandomInt, StartedMatchState, MatchFinishReason, MatchStartedMessage} from "./Model";


export function getPlayerID(): string
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	return Spark.getPlayer().getPlayerId();
*/
}

export function getPlayerData(playerID: string): PlayerData
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	var playerDataList = Spark.runtimeCollection("playerData"); 
    return playerDataList.findOne({"playerID": playerID}); 
*/
}

export function findPlayerDataByDisplayName(displayName: string): PlayerData
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	var playerDataList = Spark.runtimeCollection("playerData"); 
    return playerDataList.findOne({"displayName" : displayName}); 
*/
}



export function getGameData(): GameData
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	var gameDataCollection = Spark.runtimeCollection("gameData");
	return gameDataCollection.findOne();
*/
}



export function save(playerData: PlayerData)
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	var playerDataList = Spark.runtimeCollection("playerData"); 
    playerDataList.update({"playerID": playerData.playerID}, {"$set": playerData}, true, false);
*/
}


export function getEvent<T>(): T
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	return Spark.getData(); 
*/
}

export function sendMessage<T>(data: T, playerID: string)
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	Spark.message().setMessageData(data).setPlayerIds(playerID).send();
*/
}

export function setScriptData<T>(variable: string, data: T)
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	Spark.setScriptData(variable, data);
*/
}

export function loadMatch(matchID: string): MatchInfo
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	var match = Spark.getMultiplayer().loadMatch(matchID);
	if(match == null)    
		return null;
	
	var participantList = [];
			
	for (var _i = 0, _a = match.getParticipants(); _i < _a.length; _i++) 
	{
		var participant = _a[_i];
		var player = participant.getPlayer();
		participantList[_i] = 
		{
//                name: player.
			playerID: player.getPlayerId(),
		}
	}
	
	var result = 
	{
		matchID: matchID,
		participantList: participantList,
	};
	return result;
*/
}

export function playerIsOnline(playerID: string): boolean
{
//TypeScriptCode
	throw "Заглушка";
/*SparkCode
	return Spark.loadPlayer(playerID).isOnline();
*/
}


export function playerSetAchievement(achievementID: string)
{
	//TypeScriptCode
		throw "Заглушка";
	/*SparkCode
		var player = Spark.getPlayer();
		player.addAchievement(achievementID);
	*/
}

export function saveStartedMatch(startedMatch: StartedMatch)
{
	if(startedMatch.team1.bot == false)
	{
		saveStartedMatchPlayer(startedMatch, startedMatch.team1.playerID);
	}
	
	if(startedMatch.team2.bot == false)
	{
		saveStartedMatchPlayer(startedMatch, startedMatch.team2.playerID);
	}
}

function saveStartedMatchPlayer(startedMatch: StartedMatch, playerID: string)
{
	var playerData = getPlayerData(playerID);
	
	playerData.startedMatch = startedMatch; 

	save(playerData);
	var message: MatchFinishedMessage = 
	{
		messageType: "MatchFinishedMessage",
		playerData: playerData,
	};
	sendMessage(message, playerID);
}

export function startMatch(playerData1: PlayerData, playerData2: PlayerData, matchID: string)
{
	var dtNow = getDtNow();
	
	var teamInfo1 : TeamInfo =
	{
		playerID: playerData1.playerID,
		displayName: playerData1.displayName,
		avatar: playerData1.avatar,
		race: playerData1.race,
		bot: playerData1.bot, 
		donate: playerData1.donateExpiredDateTime > dtNow,
	} 
	var teamInfo2 : TeamInfo =
	{
		playerID: playerData2.playerID,
		displayName: playerData2.displayName,
		avatar: playerData2.avatar,
		race: playerData2.race,
		bot: playerData2.bot, 
		donate: playerData2.donateExpiredDateTime > dtNow,
	} 
	
	var seed = getRandomInt(0, 10000);
	var blue = getRandomInt(0, 2);
	
	var startedMatch : StartedMatch = 
	{
		matchID: matchID,
		seed: seed,
		team1: blue == 1 ? teamInfo1 : teamInfo2,
		team2: blue == 1 ? teamInfo2 : teamInfo1,
		state: StartedMatchState.InProgress,
		finishReason: MatchFinishReason.None,
	};
	
	if(playerData1.bot == false)
	{
		playerData1.startedMatch = startedMatch;
		save(playerData1);
		var message1 : MatchStartedMessage =
		{
			messageType: "MatchStartedMessage",
			playerData: playerData1,
		};
		sendMessage(message1, playerData1.playerID);
	}	
	
	if(playerData2.bot == false)
	{
		playerData2.startedMatch = startedMatch;
		save(playerData2);
		var message2 : MatchStartedMessage =
		{
			messageType: "MatchStartedMessage",
			playerData: playerData2,
		};
		sendMessage(message2, playerData2.playerID);
	}

}


export function sendLeaderboardValue(playerData: PlayerData)
{
	//TypeScriptCode
		throw "Заглушка";
	/*SparkCode
//		Spark.sendRequest({"@class": ".LogEventRequest", "eventKey": "setLeaderboardGroup", "honor": playerData.honor, "league": playerData.league, "division": playerData.division});
	*/
}

export function resetLeaderboardValue(playerData: PlayerData)
{
	//TypeScriptCode
		throw "Заглушка";
	/*SparkCode
		Spark.sendRequest({"@class": ".LogEventRequest", "eventKey": "setLeaderboardGroup", "honor": -1, "league": playerData.league, "division": playerData.division, "local": playerData.local});
	*/
}

export function getDtNow(): number
{
	//TypeScriptCode
		throw "Заглушка";
	/*SparkCode
		return new Date().getTime();
	*/
}

export function addDtDay(dateTime: number, day: number): number
{
	//TypeScriptCode
		throw "Заглушка";
	/*SparkCode
		var d = new Date(dateTime);
		d.setDate(d.getDate() + day); 
		return d.getTime();
	*/
	
}