import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // TODO: persist quiz answers and run the matching model. For now: log only.
  console.log("[quiz-submit]", body);

  return NextResponse.json({ ok: true, position: 12848 });
}
