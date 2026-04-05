import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000 * 60 * 14,
  reconnectionAttempts: 5,
});
