export const SESSION_STORAGE_KEY = "session";
export const SECRET_KEY = "secret_key";

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


export function getLocalSecret() {
  return localStorage.getItem(SECRET_KEY)
}

export function saveLocalSecret(data) {
  try {
    localStorage.setItem(SECRET_KEY, data)
  } catch {}
}

export function removeLocalSecret() {
  localStorage.removeItem(SECRET_KEY)
}


// 监听存储变化的封装函数
export function addStorageListener(key, callback) {
  // 事件监听器回调函数
  function storageEventListener(event) {
    console.log('envet', event);
    if (event.key === key) {
      // 存储值发生变化，执行回调函数
      callback(event.newValue);
    }
  }
 
  // 添加事件监听器
  window.addEventListener('storage', storageEventListener);
  return () => {
    window.removeEventListener('storage', storageEventListener);
  }
}
