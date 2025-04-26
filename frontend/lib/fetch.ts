import { API_URL } from "@/constants/api";
import { getErrorMessage } from "./errors";
import { PostOptions } from "./types";

export const post = async (
  path: string,
  formData: FormData,
  options?: PostOptions
) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }

  if (options?.returnRes) {
    return { body: parsedRes, headers: res.headers };
  }
};
