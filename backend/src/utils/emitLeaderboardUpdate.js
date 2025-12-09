const SocketEvents = require('./socketEvents');

const LEGACY_EVENTS = [
  SocketEvents.LEADERBOARD_UPDATE,
  SocketEvents.RANKINGS_UPDATE,
];

function emitLeaderboardUpdate(target, payload) {
  if (!target?.emit) {
    return;
  }

  for (const eventName of LEGACY_EVENTS) {
    target.emit(eventName, payload);
  }
}

module.exports = emitLeaderboardUpdate;
