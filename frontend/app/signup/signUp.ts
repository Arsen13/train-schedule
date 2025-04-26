"use server";

import { post } from "@/lib/fetch";
import { jwtDecode } from "jwt-decode";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export default async function signUp(formData: FormData) {
  const errorOrRes = await post("user", formData, { returnRes: true });
  if (errorOrRes && "error" in errorOrRes) {
    return errorOrRes;
  }

  const setCookieHeader = errorOrRes?.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    const cookie: ResponseCookie = {
      name: "Authentication",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
      sameSite: "none",
    };
    (await cookies()).set(cookie);
  }

  return errorOrRes?.body;
}
