import { NextResponse } from "next/server";
import { submitRsvp } from "@/app/lib/rsvp";

/** Body sent from RSVP form (before mapping) */
interface RsvpFormBody {
  name: string;
  going: string;
  mainCourse: string;
  dietaryRestrictions: string[];
}

/** Map form fields to payload for Google Script: name, going, menu, allergies */
function mapFormToPayload(body: RsvpFormBody) {
  return {
    name: body.name,
    going: body.going,
    menu: body.mainCourse,
    allergies: body.dietaryRestrictions ?? [],
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RsvpFormBody;
    const payload = mapFormToPayload(body);

    const response = await submitRsvp(payload);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to submit to sheet" },
        { status: 502 }
      );
    }

    try {
      const data = await response.json();
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("RSVP API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
