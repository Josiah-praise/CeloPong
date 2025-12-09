const SocketEvents = require('./socketEvents');

function emitLeaderboardUpdate(target, payload) {
  if (!target?.emit) {
    return;
  }

  target.emit(SocketEvents.LEADERBOARD_UPDATE, payload);
  target.emit(SocketEvents.RANKINGS_UPDATE, payload);
}

module.exports = emitLeaderboardUpdate;
