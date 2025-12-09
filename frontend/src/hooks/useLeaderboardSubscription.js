import { useEffect, useState, useMemo, useCallback } from 'react';
import io from 'socket.io-client';
import { BACKEND_URL, SOCKET_EVENTS } from '../constants';

export default function useLeaderboardSubscription() {
  const [leaderboard, setLeaderboard] = useState([]);

  const socket = useMemo(
    () =>
      io(BACKEND_URL, {
        withCredentials: true,
        transports: ['websocket'],
      }),
    []
  );

  return {
    leaderboard,
    setLeaderboard,
    socket,
  };
}
