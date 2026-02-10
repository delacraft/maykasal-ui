/**
 * Payload sent to Google Apps Script (mapped from RSVP form).
 * name, going, menu, allergies
 */
export interface RsvpPayload {
    name: string;
    going: string;
    menu: string;
    allergies: string[];
}

export async function submitRsvp(payload: RsvpPayload): Promise<Response> {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
        throw new Error("GOOGLE_SCRIPT_URL is not configured");
    }

    const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    return response;
}
