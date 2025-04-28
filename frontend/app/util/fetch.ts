"use server";

import { API_URL } from "@/constants/api";
import { PostOptions, RecordT } from "@/lib/types";
import { cookies } from "next/headers";
import { getErrorMessage } from "./errors";

export const getHeaders = async () => ({
  Cookie: await cookies().toString(),
});

export const post = async (
  path: string,
  formData: FormData,
  options?: PostOptions
) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await getHeaders()) },
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

export const getWrapper = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: {
      ...(await getHeaders()),
    },
  });
  return res.json();
};

export const postWrapper = async (path: string, data: RecordT) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeaders()),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const putWrapper = async (path: string, data: RecordT) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeaders()),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteWrapper = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      ...(await getHeaders()),
    },
  });
  return res.json();
};
