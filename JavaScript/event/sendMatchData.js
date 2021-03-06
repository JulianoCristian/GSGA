"use strict";
require("SparkHelper")
require("Model")



var playerID = getPlayerID();
var playerData = getPlayerData(playerID);
var event = getEvent();
if (playerData == null) {
    throw "playerData == null";
}
if (playerData.startedMatch == null) {
    throw "playerData.startedMatch == null";
}
if (playerData.startedMatch.state == StartedMatchState.InProgress) {
    var message = {
        messageType: "MatchDataMessage",
        data: event.data,
        senderPlayerID: playerID
    };
    sendMessage(message, event.playerID);
}
