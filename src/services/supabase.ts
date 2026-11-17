import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface AlbumPhoto {
  id: string;
  autor: string;
  url: string;
  caption: string | null;
  created_at: string;
}

export interface GuestRegistration {
  nombre: string;
  asistencia: string;
  acompanantes?: number;
  dispositivo: string;
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(url: string, anonKey: string): SupabaseClient | null {
  if (!url || !anonKey || url.includes('tu-proyecto') || anonKey.includes('tu_anon_key')) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(url, anonKey);
  }
  return cachedClient;
}

export async function registerGuestInSupabase(
  client: SupabaseClient | null,
  payload: GuestRegistration
): Promise<boolean> {
  if (!client) return false;

  const { error } = await client.from('invitados').insert({
    nombre: payload.nombre,
    asistencia: payload.asistencia,
    acompanantes: payload.acompanantes ?? 0,
    dispositivo: payload.dispositivo,
  });

  if (error) {
    console.warn('Error registrando invitado en Supabase:', error.message);
    return false;
  }
  return true;
}

export async function fetchAlbumPhotos(client: SupabaseClient | null): Promise<AlbumPhoto[]> {
  if (!client) return [];

  const { data, error } = await client
    .from('album_fotos')
    .select('id, autor, url, caption, created_at')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.warn('Error cargando fotos del álbum:', error?.message);
    return [];
  }
  return data;
}

export async function uploadAlbumPhoto(
  client: SupabaseClient | null,
  blob: Blob,
  autor: string,
  caption: string
): Promise<AlbumPhoto | null> {
  if (!client) return null;

  const ext = blob.type.includes('png') ? 'png' : blob.type.includes('webp') ? 'webp' : 'jpg';
  const filePath = `fiesta/${Date.now()}_${Math.random().toString(36).slice(2, 9)}.${ext}`;

  const { data: uploadData, error: uploadError } = await client.storage
    .from('album-fiesta')
    .upload(filePath, blob, {
      contentType: blob.type || 'image/jpeg',
      upsert: false,
    });

  if (uploadError || !uploadData) {
    console.warn('Error subiendo foto a Storage:', uploadError?.message);
    return null;
  }

  const { data: publicData } = client.storage.from('album-fiesta').getPublicUrl(uploadData.path);
  const publicUrl = publicData.publicUrl;

  const { data: rowData, error: insertError } = await client
    .from('album_fotos')
    .insert({
      autor: autor.trim(),
      url: publicUrl,
      caption: caption.trim() || null,
    })
    .select('id, autor, url, caption, created_at')
    .single();

  if (insertError || !rowData) {
    console.warn('Error guardando registro de foto:', insertError?.message);
    return null;
  }

  return rowData;
}
