import { NextResponse } from "next/server";
import { submitRsvp } from "@/app/lib/rsvp";

/** Body sent from RSVP form (before mapping) */
interface RsvpFormBody {
  name: string;
  going: string;
  mainCourse: string;
  dietaryRestrictions: string[];
  recaptchaToken?: string;
}

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_RECAPTCHA_SCORE = 0.5;

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { success: true };

  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success: boolean; score?: number };
  return data;
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

    if (body.recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      const result = await verifyRecaptcha(body.recaptchaToken);
      if (!result.success || (result.score != null && result.score < MIN_RECAPTCHA_SCORE)) {
        return NextResponse.json(
          { error: "Verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

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
