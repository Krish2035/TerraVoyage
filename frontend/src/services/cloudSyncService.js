/**
 * TerraVoyage Cloud Account Sync & Social Sharing Service
 */

const CLOUD_USER_KEY = 'terra_voyage_cloud_user';
const CLOUD_SYNC_TIME_KEY = 'terra_voyage_cloud_last_sync';

export function getStoredUser() {
  try {
    const data = localStorage.getItem(CLOUD_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export function saveUser(user) {
  try {
    localStorage.setItem(CLOUD_USER_KEY, JSON.stringify(user));
    localStorage.setItem(CLOUD_SYNC_TIME_KEY, new Date().toISOString());
  } catch (e) {}
}

export function getLastSyncTime() {
  try {
    return localStorage.getItem(CLOUD_SYNC_TIME_KEY) || null;
  } catch (e) {
    return null;
  }
}

export function generateShareUrl(itineraryItems, country) {
  const baseUrl = window.location.origin + window.location.pathname;
  const payload = {
    c: country?.code || '',
    items: (itineraryItems || []).map(i => ({
      id: i.id,
      name: i.name,
      loc: i.location
    }))
  };
  try {
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    return `${baseUrl}?trip=${encoded}`;
  } catch (e) {
    return country ? `${baseUrl}?country=${country.code}` : baseUrl;
  }
}

export function decodeSharedTrip(searchParams) {
  const tripParam = searchParams.get('trip');
  if (!tripParam) return null;
  try {
    const decodedStr = decodeURIComponent(atob(tripParam));
    return JSON.parse(decodedStr);
  } catch (e) {
    return null;
  }
}
