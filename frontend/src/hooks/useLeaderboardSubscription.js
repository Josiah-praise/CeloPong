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

  useEffect(() => {
    let isMounted = true;

    async function fetchInitialLeaderboard() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/rankings/top?limit=10`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Failed to load leaderboard: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setLeaderboard(data);
        }
      } catch (error) {
        console.error('[Leaderboard] initial fetch failed', error);
      }
    }

    fetchInitialLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    leaderboard,
    setLeaderboard,
    socket,
  };
}
