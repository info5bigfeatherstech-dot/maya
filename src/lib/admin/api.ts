import { clearAdminToken, getAdminToken, setAdminToken } from "./auth";
import type {
  AdminUser,
  Category,
  CategoryPayload,
  Customer,
  CustomerPayload,
  DashboardCategoryDistribution,
  DashboardFactoryWorkloadItem,
  DashboardInventoryAlerts,
  DashboardMarketAndBuyer,
  DashboardRecentActivity,
  DashboardSummary,
  Factory,
  FactoryPayload,
  Product,
  ProductImportPreview,
  ProductImportResult,
} from "./types";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

const LEGACY_STORAGE_KEY = "maya_admin_token";

/**
 * Clears any fallback/legacy tokens stored in client-side storage.
 */
export function clearLegacyStorage(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(LEGACY_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // Ignore storage errors in restricted contexts
  }
  clearAdminToken();
}

/**
 * Retrieves the fallback token from localStorage, sessionStorage, or auth helper.
 */
export function getLegacyStorageToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const token =
      localStorage.getItem(LEGACY_STORAGE_KEY) ||
      sessionStorage.getItem(LEGACY_STORAGE_KEY) ||
      getAdminToken();
    return token || null;
  } catch {
    return null;
  }
}

/**
 * Sets fallback token in localStorage and auth helper.
 */
export function setLegacyStorageToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LEGACY_STORAGE_KEY, token);
    setAdminToken(token);
  } catch {
    // Ignore storage errors
  }
}

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getLegacyStorageToken();
  const headers = new Headers(options.headers);

  // Fallback to Authorization: Bearer <token> if available and not explicitly set
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (!isFormData && options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch (err) {
    if (err instanceof AdminApiError) throw err;
    throw new AdminApiError(
      "Cannot reach the admin API. Please ensure the backend server is running on port 5000.",
      0
    );
  }

  const payload = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
    data?: T;
  };

  if (!response.ok) {
    if (response.status === 401) {
      clearLegacyStorage();
    }
    const message = payload.message || response.statusText || "Request failed";
    throw new AdminApiError(message, response.status);
  }

  return (payload.data !== undefined ? payload.data : (payload as unknown as T)) as T;
}

export const adminApi = {
  /**
   * Authenticate admin with email and password.
   * Cookie is set automatically via Set-Cookie header with credentials: "include".
   */
  async login(email: string, password: string) {
    const data = await request<{ admin: AdminUser; token?: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data && typeof data === "object" && "token" in data && typeof data.token === "string") {
      setLegacyStorageToken(data.token);
    }

    return data;
  },

  /**
   * Log out active session and clear client-side storage.
   */
  async logout() {
    try {
      await request<{ success: boolean; message: string }>("/auth/logout", {
        method: "POST",
      });
    } finally {
      clearLegacyStorage();
    }
  },

  /**
   * Validate current session and retrieve active admin details.
   */
  me() {
    return request<{ admin: AdminUser }>("/auth/me", {
      method: "GET",
    });
  },

  listCategories() {
    return request<Category[]>("/categories");
  },

  createCategory(payload: CategoryPayload) {
    return request<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateCategory(id: string, payload: CategoryPayload) {
    return request<Category>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  deleteCategory(id: string) {
    return request<{ id: string }>(`/categories/${id}`, { method: "DELETE" });
  },

  listProducts(params?: { category?: string; search?: string; includeInactive?: boolean }) {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.search) query.set("search", params.search);
    if (params?.includeInactive) query.set("includeInactive", "true");
    const suffix = query.toString() ? `?${query.toString()}` : "";
    return request<Product[]>(`/products${suffix}`);
  },

  getProduct(id: string) {
    return request<Product>(`/products/${id}`);
  },

  createProduct(form: FormData) {
    return request<Product>("/products", { method: "POST", body: form });
  },

  updateProduct(id: string, form: FormData) {
    return request<Product>(`/products/${id}`, { method: "PUT", body: form });
  },

  deleteProduct(id: string) {
    return request<{ id: string }>(`/products/${id}`, { method: "DELETE" });
  },

  previewImport(form: FormData) {
    return request<ProductImportPreview>("/products/import/preview", { method: "POST", body: form });
  },

  importProducts(form: FormData) {
    return request<ProductImportResult>("/products/import", { method: "POST", body: form });
  },

  async downloadImportTemplate() {
    const token = getLegacyStorageToken();
    const headers = new Headers();
    if (token) headers.set("Authorization", `Bearer ${token}`);

    let response: Response;
    try {
      response = await fetch(`${API_BASE}/products/import/template`, {
        headers,
        credentials: "include",
      });
    } catch {
      throw new AdminApiError("Cannot reach the admin API. Start the backend on port 5000.", 0);
    }

    if (!response.ok) {
      if (response.status === 401) clearLegacyStorage();
      throw new AdminApiError("Unable to download the import template", response.status);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "maya-exports-product-import.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },

  listFactories() {
    return request<Factory[]>("/factories");
  },

  createFactory(payload: FactoryPayload) {
    return request<Factory>("/factories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateFactory(id: string, payload: FactoryPayload) {
    return request<Factory>(`/factories/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  deleteFactory(id: string) {
    return request<{ id: string }>(`/factories/${id}`, { method: "DELETE" });
  },

  listCustomers() {
    return request<Customer[]>("/customers");
  },

  createCustomer(payload: CustomerPayload) {
    return request<Customer>("/customers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateCustomer(id: string, payload: CustomerPayload) {
    return request<Customer>(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  deleteCustomer(id: string) {
    return request<{ id: string }>(`/customers/${id}`, { method: "DELETE" });
  },

  getDashboardSummary() {
    return request<DashboardSummary>("/admin/dashboard/summary");
  },

  getCategoryDistribution(params?: { range?: string; season?: string }) {
    const query = new URLSearchParams();
    if (params?.range) query.set("range", params.range);
    if (params?.season) query.set("season", params.season);
    const suffix = query.toString() ? `?${query.toString()}` : "";
    return request<DashboardCategoryDistribution>(`/admin/dashboard/category-distribution${suffix}`);
  },

  getMarketAndBuyerAnalytics(params?: { range?: string; season?: string }) {
    const query = new URLSearchParams();
    if (params?.range) query.set("range", params.range);
    if (params?.season) query.set("season", params.season);
    const suffix = query.toString() ? `?${query.toString()}` : "";
    return request<DashboardMarketAndBuyer>(`/admin/dashboard/market-and-buyer-analytics${suffix}`);
  },

  getFactoryWorkload() {
    return request<DashboardFactoryWorkloadItem[]>("/admin/dashboard/factory-workload");
  },

  getInventoryAlerts(threshold?: number) {
    const suffix = typeof threshold === "number" ? `?threshold=${threshold}` : "";
    return request<DashboardInventoryAlerts>(`/admin/dashboard/inventory-alerts${suffix}`);
  },

  getRecentActivity() {
    return request<DashboardRecentActivity>("/admin/dashboard/recent-activity");
  },
};
