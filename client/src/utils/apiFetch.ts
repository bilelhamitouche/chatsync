import { socket } from "@/lib/socket";

export const apiFetch = async (path: string, options?: RequestInit) => {
  let res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    const refresh = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (refresh.ok) {
      socket.disconnect();
      socket.connect();
      res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
        credentials: "include",
        ...options,
      });
    } else {
      throw new Error("Unauthenticated");
    }
  }

  if (!res.ok) throw new Error(await res.text());
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};
