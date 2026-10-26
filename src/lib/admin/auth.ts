const TOKEN_KEY = "maya_admin_token";

function clearLegacyBrowserTokens() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function getAdminToken(): string {
  clearLegacyBrowserTokens();
  return "";
}

export function setAdminToken(_token: string): void {
  clearLegacyBrowserTokens();
}

export function clearAdminToken(): void {
  clearLegacyBrowserTokens();
}
