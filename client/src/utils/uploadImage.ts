import { apiFetch } from "./apiFetch";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const data = await apiFetch("/api/messages/upload", {
    method: "POST",
    body: formData,
  });

  return data.url;
};
