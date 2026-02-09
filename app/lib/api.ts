// Mock API functions for RSVP system
// TODO: Replace with actual API calls

export interface Guest {
  code: string;
  name: string;
  email?: string;
  phone?: string;
}

/**
 * Get guest information by RSVP code
 * @param code - The 6-character alphanumeric RSVP code
 * @returns Guest name
 */
export const getGuestName = (code: string): string => {
  const guestMap: { [key: string]: string } = {
    'ABC123': 'Maria',
    'XYZ789': 'Juan',
    'GUEST': 'Friend',
  };
  return guestMap[code] || 'Friend';
};

/**
 * Get full guest details by RSVP code
 * @param code - The 6-character alphanumeric RSVP code
 * @returns Guest object with full details
 */
export const getGuestDetails = async (code: string): Promise<Guest> => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch(`/api/guests/${code}`);

  return {
    code,
    name: getGuestName(code),
    email: 'guest@example.com',
    phone: '+1234567890',
  };
};

/**
 * Submit RSVP form data
 * @param code - The RSVP code
 * @param formData - The form data to submit
 * @returns Success status
 */
export const submitRSVP = async (code: string, formData: any): Promise<boolean> => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/rsvp', { method: 'POST', body: JSON.stringify({ code, ...formData }) });

  console.log('Submitting RSVP:', { code, formData });
  return true;
};
