import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}
