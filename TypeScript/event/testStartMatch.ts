import {getPlayerID, getPlayerData, getEvent, save, sendMessage } from "../modules/SparkHelper";
import {MatchFinishReason, StartedMatch, StartedMatchState, getRandomInt, getDefaultPlayerData, TestStartMatchEvent, MatchStartedMessage, TeamInfo} from "../modules/Model";



var playerID1 = getPlayerID();
var playerData1 = getPlayerData(playerID1);
var event = getEvent<TestStartMatchEvent>(); 
var playerID2 = event.opponentPlayerID;
var playerData2 = getPlayerData(playerID2);

if(playerData1 == null)
{
    throw "playerData1 == null";
}

if(playerData1.startedMatch != null)
{
    throw "playerData1.startedMatch != null";
}

if(playerData2 == null)
{
    throw "playerData2 == null";
}

if(playerData2.startedMatch != null)
{
    throw "playerData2.startedMatch != null";
}

var teamInfo1 : TeamInfo =
{
	playerID: playerID1,
	displayName: playerData1.displayName,
	avatar: playerData1.avatar,
	race: playerData1.race,
	bot: false,
	donate: false,
} 
var teamInfo2 : TeamInfo =
{
	playerID: playerID2,
	displayName: playerData2.displayName,
	avatar: playerData2.avatar,
	race: playerData2.race,
	bot: false,
	donate: false,
} 

var seed = getRandomInt(0, 10000);
var blue = getRandomInt(0, 2);

var startedMatch : StartedMatch = 
{
	matchID: "undef",
    seed: seed,
	team1: blue == 1 ? teamInfo1 : teamInfo2,
	team2: blue == 1 ? teamInfo2 : teamInfo1,
	state: StartedMatchState.InProgress,
	finishReason: MatchFinishReason.None,
//	changeWinnerRes1: 0,
//	changeWinnerRes2: 0,
//	changeWinnerHonor: 0,
//	changeLoserRes1: 0,
//	changeLoserRes2: 0,
//	changeLoserHonor: 0,
};

playerData1.startedMatch = startedMatch;
playerData2.startedMatch = startedMatch;

save(playerData1);
save(playerData2);

var message1 : MatchStartedMessage =
{
	messageType: "MatchStartedMessage",
	playerData: playerData1,
};
sendMessage(message1, playerID1);

var message2 : MatchStartedMessage =
{
	messageType: "MatchStartedMessage",
	playerData: playerData2,
};
sendMessage(message2, playerID2);








