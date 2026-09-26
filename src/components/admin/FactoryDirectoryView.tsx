"use client";

import React, { useState } from "react";
import { FactoryRecord } from "@/types/adminProduct";
import { generateFactoryCode } from "@/data/adminData";
import { Building2, Plus, Sparkles, Phone, MapPin, Check } from "lucide-react";

interface FactoryDirectoryViewProps {
  factories: FactoryRecord[];
  onAddFactory: (factory: FactoryRecord) => void;
}

export function FactoryDirectoryView({
  factories,
  onAddFactory,
}: FactoryDirectoryViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState(generateFactoryCode(factories.length + 1));
  const [country, setCountry] = useState("Bangladesh");
  const [city, setCity] = useState("Dhaka");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFac: FactoryRecord = {
      id: `fac-${Date.now()}`,
      code: code.trim() || generateFactoryCode(factories.length + 1),
      name: name.trim(),
      country,
      city,
      contactPerson: contactPerson || "Factory Merchandiser",
      phone: phone || "+880 1700-000000",
      activeOrders: 1,
    };

    onAddFactory(newFac);
    setShowAddModal(false);
    setName("");
    setCode(generateFactoryCode(factories.length + 2));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Approved Manufacturing Factories & Mills
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered garment manufacturing facilities with standard F26-xxx codes and export ports.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Register New Factory
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {factories.map((f) => (
          <div
            key={f.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-blue-200 transition space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {f.code}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  {f.name}
                </h4>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {f.activeOrders} Active Orders
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  {f.city}, {f.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  {f.contactPerson} &bull; {f.phone}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Factory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 w-full max-w-md animate-in fade-in zoom-in-95">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Add Partner Factory
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Enter facility credentials for automated code allocation.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Factory Code
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setCode(
                        generateFactoryCode(Math.floor(10 + Math.random() * 89))
                      )
                    }
                    className="text-[11px] text-blue-600 inline-flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Re-Generate
                  </button>
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Factory Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pacific Textiles Ltd"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Port
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Merchandiser"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / Email
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880..."
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
                  Save Factory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
