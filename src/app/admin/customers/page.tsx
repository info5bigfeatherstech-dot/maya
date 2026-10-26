"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { CUSTOMER_TIERS } from "@/lib/admin/erp";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import type { Customer, CustomerPayload } from "@/lib/admin/types";

const emptyForm: CustomerPayload = {
  name: "",
  country: "",
  tier: "Wholesale",
  primaryContact: "",
  email: "",
};

export default function AdminCustomersPage() {
  const [rows, setRows] = useState<Customer[]>([]);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<CustomerPayload>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setRows(await adminApi.listCustomers());
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    load()
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load customers");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
    setError("");
  };

  const openEdit = (customer: Customer) => {
    setEditing(customer);
    setForm({
      name: customer.name,
      country: customer.country,
      tier: customer.tier,
      primaryContact: customer.primaryContact,
      email: customer.email,
    });
    setFormOpen(true);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Customer name is required");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        country: form.country?.trim() || "",
        tier: form.tier || "Wholesale",
        primaryContact: form.primaryContact?.trim() || "",
        email: form.email?.trim() || "",
      };
      if (editing) {
        await adminApi.updateCustomer(editing.id, payload);
      } else {
        await adminApi.createCustomer(payload);
      }
      await load();
      setFormOpen(false);
      setEditing(null);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to save customer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (customer: Customer) => {
    if (!window.confirm(`Delete customer "${customer.name}"? Products using it must be reassigned first.`)) return;
    try {
      await adminApi.deleteCustomer(customer.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete customer");
    }
  };

  const setField = (field: keyof CustomerPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <AdminShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Customers</h1>
            <p className="text-sm text-slate-500 mt-1">
              Customer codes are generated automatically (C26-001). Style codes generate when you assign a customer on a product.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Add customer
          </button>
        </div>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
        ) : null}

        {formOpen ? (
          <form onSubmit={(event) => void handleSubmit(event)} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">{editing ? "Edit customer" : "New customer"}</h2>
            {editing ? <p className="text-xs text-slate-500">Code: {editing.code}</p> : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block space-y-1.5 md:col-span-2">
                <span className="text-xs font-semibold text-slate-600">Name</span>
                <input value={form.name} onChange={(event) => setField("name", event.target.value)} required maxLength={120} className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Country</span>
                <input value={form.country} onChange={(event) => setField("country", event.target.value)} maxLength={80} className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Tier</span>
                <select
                  value={form.tier}
                  onChange={(event) => setField("tier", event.target.value)}
                  className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {CUSTOMER_TIERS.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Primary contact</span>
                <input value={form.primaryContact} onChange={(event) => setField("primaryContact", event.target.value)} maxLength={80} className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Email</span>
                <input type="email" value={form.email} onChange={(event) => setField("email", event.target.value)} maxLength={120} className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setFormOpen(false)} className="px-3 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-60">
                {submitting ? "Saving..." : editing ? "Update customer" : "Create customer"}
              </button>
            </div>
          </form>
        ) : null}

        {loading ? (
          <div className="text-sm text-slate-500">Loading customers...</div>
        ) : rows.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500">
            No customers yet.
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Code</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold hidden sm:table-cell">Tier</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Contact</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-mono text-xs">{customer.code}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-slate-500">{customer.country || "—"}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{customer.tier}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                      {[customer.primaryContact, customer.email].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button type="button" onClick={() => openEdit(customer)} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                        Edit
                      </button>
                      <button type="button" onClick={() => void handleDelete(customer)} className="text-xs font-semibold text-red-600 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
