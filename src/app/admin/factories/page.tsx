"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import type { Factory, FactoryPayload } from "@/lib/admin/types";

const emptyForm: FactoryPayload = {
  name: "",
  country: "",
  city: "",
  contactPerson: "",
  phone: "",
};

export default function AdminFactoriesPage() {
  const [rows, setRows] = useState<Factory[]>([]);
  const [editing, setEditing] = useState<Factory | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FactoryPayload>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setRows(await adminApi.listFactories());
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    load()
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load factories");
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

  const openEdit = (factory: Factory) => {
    setEditing(factory);
    setForm({
      name: factory.name,
      country: factory.country,
      city: factory.city,
      contactPerson: factory.contactPerson,
      phone: factory.phone,
    });
    setFormOpen(true);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Factory name is required");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        country: form.country?.trim() || "",
        city: form.city?.trim() || "",
        contactPerson: form.contactPerson?.trim() || "",
        phone: form.phone?.trim() || "",
      };
      if (editing) {
        await adminApi.updateFactory(editing.id, payload);
      } else {
        await adminApi.createFactory(payload);
      }
      await load();
      setFormOpen(false);
      setEditing(null);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to save factory");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (factory: Factory) => {
    if (!window.confirm(`Delete factory "${factory.name}"? Products using it must be reassigned first.`)) return;
    try {
      await adminApi.deleteFactory(factory.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete factory");
    }
  };

  const setField = (field: keyof FactoryPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <AdminShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Factories</h1>
            <p className="text-sm text-slate-500 mt-1">
              Factory codes are generated automatically (F26-001). Assign factories on the product form.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Add factory
          </button>
        </div>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
        ) : null}

        {formOpen ? (
          <form onSubmit={(event) => void handleSubmit(event)} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">{editing ? "Edit factory" : "New factory"}</h2>
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
                <span className="text-xs font-semibold text-slate-600">City</span>
                <input value={form.city} onChange={(event) => setField("city", event.target.value)} maxLength={80} className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Contact person</span>
                <input value={form.contactPerson} onChange={(event) => setField("contactPerson", event.target.value)} maxLength={80} className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Phone</span>
                <input value={form.phone} onChange={(event) => setField("phone", event.target.value)} maxLength={40} className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setFormOpen(false)} className="px-3 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-60">
                {submitting ? "Saving..." : editing ? "Update factory" : "Create factory"}
              </button>
            </div>
          </form>
        ) : null}

        {loading ? (
          <div className="text-sm text-slate-500">Loading factories...</div>
        ) : rows.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500">
            No factories yet.
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Code</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold hidden sm:table-cell">Location</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Contact</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((factory) => (
                  <tr key={factory.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-mono text-xs">{factory.code}</td>
                    <td className="px-4 py-3 font-medium">{factory.name}</td>
                    <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">
                      {[factory.city, factory.country].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                      {[factory.contactPerson, factory.phone].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button type="button" onClick={() => openEdit(factory)} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                        Edit
                      </button>
                      <button type="button" onClick={() => void handleDelete(factory)} className="text-xs font-semibold text-red-600 hover:text-red-700">
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
