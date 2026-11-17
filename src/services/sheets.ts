export interface SheetPayload {
  nombre: string;
  asistencia: string;
  acompanantes?: string;
  dispositivo: string;
}

const STORAGE_KEYS = {
  guestName: 'xv_arianna_guest_name',
  registered: 'registrado',
  rsvpSubmitted: 'xv_arianna_rsvp_status',
  deviceToken: 'xv_arianna_device_token',
} as const;

export function getOrCreateDeviceToken(): string {
  let token = localStorage.getItem(STORAGE_KEYS.deviceToken);
  if (!token) {
    token =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem(STORAGE_KEYS.deviceToken, token);
  }
  return token;
}

export function getSavedGuestName(): string {
  return localStorage.getItem(STORAGE_KEYS.guestName) ?? '';
}

export function saveGuestName(name: string): void {
  localStorage.setItem(STORAGE_KEYS.guestName, name.trim());
}

export function isAlreadyRegistered(): boolean {
  return Boolean(localStorage.getItem(STORAGE_KEYS.registered));
}

export function markRegistered(): void {
  localStorage.setItem(STORAGE_KEYS.registered, 'true');
}

export function getSavedRsvpStatus(): string {
  return localStorage.getItem(STORAGE_KEYS.rsvpSubmitted) ?? '';
}

export function saveRsvpStatus(status: string): void {
  localStorage.setItem(STORAGE_KEYS.rsvpSubmitted, status);
}

/**
 * Sends guest activity or RSVP to Google Apps Script webhook using no-cors.
 */
export async function postToSheetsWebhook(
  webhookUrl: string,
  payload: SheetPayload
): Promise<boolean> {
  if (!webhookUrl || webhookUrl.includes('[PEGA_AQUI')) {
    return false;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.warn('No se pudo enviar al webhook de Google Sheets:', error);
    return false;
  }
}
