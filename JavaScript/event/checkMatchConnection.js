"use strict";
require("SparkHelper")
require("Model")



var playerID = getPlayerID();
var playerData = getPlayerData(playerID);
if (playerData == null) {
    throw "playerData == null";
}
if (playerData.startedMatch == null) {
    throw "playerData.startedMatch == null";
}
var startedMatch = playerData.startedMatch;
var isOnlineBlue = playerIsOnline(startedMatch.teamBlue.playerID);
var isOnlineRed = playerIsOnline(startedMatch.teamRed.playerID);
if (isOnlineBlue && !isOnlineRed) {
    setStartedMatchWinner(startedMatch, TeamType.Blue, MatchFinishReason.Disconnect);
    saveStartedMatch(startedMatch);
}
else if (!isOnlineBlue && isOnlineRed) {
    setStartedMatchWinner(startedMatch, TeamType.Red, MatchFinishReason.Disconnect);
    saveStartedMatch(startedMatch);
}
