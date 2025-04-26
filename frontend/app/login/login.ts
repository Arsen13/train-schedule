"use server";

import { post } from "@/lib/fetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function login(formData: FormData) {
  const errorOrRes = await post("auth/login", formData, { returnRes: true });
  if (errorOrRes && "error" in errorOrRes) {
    return errorOrRes;
  }

  const setCookieHeader = errorOrRes?.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    (await cookies()).set({
      name: "Authentication",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }

  return errorOrRes?.body;
}
