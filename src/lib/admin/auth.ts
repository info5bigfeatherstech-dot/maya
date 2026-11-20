const TOKEN_KEY = "maya_admin_token";

export function clearLegacyBrowserTokens(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore in storage-restricted contexts
  }
}

export function getAdminToken(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Ignore
  }
}

export function clearAdminToken(): void {
  clearLegacyBrowserTokens();
}
