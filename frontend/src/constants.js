import { resolveBackendUrlWithSource } from './utils/backendUrl';

// Game constants
export const STORAGE_KEY = 'pong_username';

// Game settings
export const INITIAL_BALL_SPEED = 31;
export const PADDLE_SPEED = 0.01;
export const INITIAL_RATING = 1000;

// Backend connection
const backendUrlMeta = resolveBackendUrlWithSource();
export const BACKEND_URL = backendUrlMeta.url;
export const BACKEND_URL_SOURCE = backendUrlMeta.source;

export const SOCKET_EVENTS = Object.freeze({
  LEADERBOARD_UPDATE: 'leaderboardUpdate',
  LEGACY_RANKINGS_UPDATE: 'rankingsUpdate',
  GET_LEADERBOARD: 'getLeaderboard',
});

export const LEADERBOARD_LIMIT = 10;

export const SHOW_BACKEND_URL_BANNER =
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_SHOW_BACKEND_URL_BANNER !== 'false';
