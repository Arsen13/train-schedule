import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).set("Authentication", "", { expires: new Date(0) });
  return NextResponse.json({ success: true });
}
