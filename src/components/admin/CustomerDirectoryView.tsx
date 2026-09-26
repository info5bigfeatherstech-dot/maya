"use client";

import React, { useState } from "react";
import { CustomerRecord } from "@/types/adminProduct";
import { generateCustomerStyleCode } from "@/data/adminData";
import { Users, Plus, Sparkles, Mail, Globe } from "lucide-react";

interface CustomerDirectoryViewProps {
  customers: CustomerRecord[];
  onAddCustomer: (customer: CustomerRecord) => void;
}

export function CustomerDirectoryView({
  customers,
  onAddCustomer,
}: CustomerDirectoryViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("XYZ");
  const [country, setCountry] = useState("United States");
  const [tier, setTier] = useState<CustomerRecord["tier"]>("Key Account");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCust: CustomerRecord = {
      id: `cust-${Date.now()}`,
      codePrefix: prefix.trim().toUpperCase() || "CST",
      name: name.trim(),
      country,
      tier,
      primaryContact: contact || "Account Director",
      email: email || "sourcing@client.com",
    };

    onAddCustomer(newCust);
    setShowAddModal(false);
    setName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            International Buyers & Customer Directory
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key accounts, retail brands and private label clients with automated C26-xxx style code prefixes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Buyer Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {customers.map((c) => (
          <div
            key={c.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-blue-200 transition space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  PREFIX: {c.codePrefix}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  {c.name}
                </h4>
              </div>
              <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {c.tier}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{c.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  {c.primaryContact} ({c.email})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 w-full max-w-md animate-in fade-in zoom-in-95">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Add Buyer Account
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Register international buyer or retail account.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Buyer / Customer Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. XYZ Fashion"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Style Prefix
                  </label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                    placeholder="e.g. XYZ"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Account Tier
                  </label>
                  <select
                    value={tier}
                    onChange={(e) =>
                      setTier(e.target.value as CustomerRecord["tier"])
                    }
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Key Account">Key Account</option>
                    <option value="Retail Brand">Retail Brand</option>
                    <option value="Boutique">Boutique</option>
                    <option value="Wholesale">Wholesale</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Buyer Name"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="buyer@client.com"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Save Buyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
