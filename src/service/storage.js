export const SESSION_STORAGE_KEY = "session";

export function getSession() {
  let session;
  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || "");
    if (parsed.token) {
      session = parsed;
    }
  } catch {}
  return session;
}

export function saveSession(data) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export function removeSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

