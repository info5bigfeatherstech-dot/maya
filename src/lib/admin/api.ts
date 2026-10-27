import { clearAdminToken, getAdminToken } from "./auth";
import type {
  AdminUser,
  Category,
  CategoryPayload,
  Customer,
  CustomerPayload,
  Factory,
  FactoryPayload,
  Product,
  ProductImportPreview,
  ProductImportResult,
} from "./types";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(options.headers);

  if (token) {
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
  } catch {
    throw new AdminApiError("Cannot reach the admin API. Start the backend on port 5000.", 0);
  }

  const payload = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
    data?: T;
  };

  if (!response.ok) {
    if (response.status === 401) {
      clearAdminToken();
    }
    throw new AdminApiError(payload.message || "Request failed", response.status);
  }

  return (payload.data ?? payload) as T;
}

export const adminApi = {
  async login(email: string, password: string) {
    const data = await request<{ admin: AdminUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return data;
  },

  async logout() {
    try {
      await request("/auth/logout", { method: "POST" });
    } finally {
      clearAdminToken();
    }
  },

  me() {
    return request<{ admin: AdminUser }>("/auth/me");
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
    const token = getAdminToken();
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
      if (response.status === 401) clearAdminToken();
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
};
