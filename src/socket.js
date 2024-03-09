import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? "https://real-time-chat-backend-production.up.railway.app" : 'http://localhost:3000';

export const socket = io(URL);