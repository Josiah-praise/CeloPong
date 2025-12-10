import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { STORAGE_KEY, BACKEND_URL, REMATCH_ROUTE } from '../constants';
import '../styles/GameOver.css';

const REMATCH_REQUEST_EVENT = 'requestRematch';
const REMATCH_RESPONSE_EVENT = 'rematchResponse';
const REMATCH_REQUESTED_EVENT = 'rematchRequested';
const REMATCH_DECLINED_EVENT = 'rematchDeclined';
const GAME_START_EVENT = 'gameStart';
const DEFAULT_SCORE = [0, 0];
const WAITING_TEXT = 'Waiting for opponent...';

const GameOver = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;
  const message = result?.message || 'Game Over';
  const finalScore = Array.isArray(result?.finalScore) ? result.finalScore : DEFAULT_SCORE;
  const stats = result?.stats || {};
  const rating = result?.rating ?? '—';
  const socketRef = useRef(null);
  const [rematchRequested, setRematchRequested] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    if (!result) {
      navigate('/');
      return;
    }

    const username = localStorage.getItem(STORAGE_KEY);
    if (!username) {
      navigate('/');
      return;
    }

    const socket = io(BACKEND_URL, {
      withCredentials: true,
      transports: ['websocket'],
      path: '/socket.io/',
      query: { username }
    });

    socketRef.current = socket;

    socket.on(REMATCH_REQUESTED_EVENT, (data) => {
      setRematchRequested(true);
      setWaitingForResponse(false);
    });

    const goToRematch = () => {
      // Navigate to existing /game route (no /multiplayer route is registered)
      setWaitingForResponse(false);
      navigate(REMATCH_ROUTE, {
        state: {
          gameMode: 'rematch',
          rematch: true
        }
      });
    };

    socket.on(GAME_START_EVENT, goToRematch);

    socket.on(REMATCH_DECLINED_EVENT, () => {
      alert('Opponent declined rematch');
      setWaitingForResponse(false);
      setRematchRequested(false);
    });

    return () => {
      socket.off(GAME_START_EVENT, goToRematch);
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const handleRematch = () => {
    if (socketRef.current) {
      socketRef.current.emit(REMATCH_REQUEST_EVENT);
      setWaitingForResponse(true);
    }
  };

  const handleAcceptRematch = () => {
    if (socketRef.current) {
      socketRef.current.emit(REMATCH_RESPONSE_EVENT, { accepted: true });
      setWaitingForResponse(true);
      setRematchRequested(false);
    }
  };

  const handleDeclineRematch = () => {
    if (socketRef.current) {
      socketRef.current.emit(REMATCH_RESPONSE_EVENT, { accepted: false });
      setRematchRequested(false);
    }
  };

  const handleGoHome = () => {
    if (socketRef.current) {
      socketRef.current.emit('leaveRoom');
      socketRef.current.disconnect();
    }
    setRematchRequested(false);
    setWaitingForResponse(false);
    navigate('/');
  };

  return (
    <div className="game-over">
      <h1>{message}</h1>
      <div className="stats">
        <p>Final Score: {finalScore[0]} - {finalScore[1]}</p>
        <p>New Rating: {rating}</p>
        <p>Game Duration: {Math.round((stats.duration || 0) / 1000)}s</p>
        <p>Total Hits: {stats.hits || 0}</p>
      </div>

      {rematchRequested && (
        <div className="rematch-request">
          <p>Opponent wants a rematch!</p>
          <div className="button-group">
            <button onClick={handleAcceptRematch} className="accept-btn" disabled={waitingForResponse}>
              Accept Rematch
            </button>
            <button onClick={handleDeclineRematch} className="decline-btn" disabled={waitingForResponse}>
              Decline
            </button>
          </div>
        </div>
      )}

      {!rematchRequested && (
        <div className="button-group">
          {waitingForResponse && <p>{WAITING_TEXT}</p>}
          <button
            onClick={handleRematch}
            disabled={waitingForResponse}
            className="rematch-btn"
          >
            {waitingForResponse ? WAITING_TEXT : 'Request Rematch'}
          </button>
          <button onClick={handleGoHome} className="home-btn">
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default GameOver; 
