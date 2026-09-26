"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminProduct, CustomerRecord, FactoryRecord } from "@/types/adminProduct";
import {
  initialAdminProducts,
  initialFactories,
  initialCustomers,
  categoriesList,
} from "@/data/adminData";
import { ProductTable } from "@/components/admin/ProductTable";
import { ProductGridView } from "@/components/admin/ProductGridView";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { ProductDetailModal } from "@/components/admin/ProductDetailModal";
import { ReadyStockManager } from "@/components/admin/ReadyStockManager";
import { SamplingPipelineView } from "@/components/admin/SamplingPipelineView";
import { FactoryDirectoryView } from "@/components/admin/FactoryDirectoryView";
import { CustomerDirectoryView } from "@/components/admin/CustomerDirectoryView";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/admin-select";
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  LayoutGrid,
  List,
  Sparkles,
  Building2,
  Users,
  Layers,
  ArrowRight,
  TrendingUp,
  Box,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Bell,
  RefreshCw,
} from "lucide-react";

export default function AdminPage() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<
    "catalog" | "readystock" | "pipeline" | "factories" | "customers"
  >("catalog");

  // Layout mode for catalog: table or grid
  const [layoutMode, setLayoutMode] = useState<"table" | "grid">("table");

  // Mobile sidebar open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Products Data with LocalStorage Persistence
  const [products, setProducts] = useState<AdminProduct[]>(initialAdminProducts);
  const [factories, setFactories] = useState<FactoryRecord[]>(initialFactories);
  const [customers, setCustomers] = useState<CustomerRecord[]>(initialCustomers);

  // Load from local storage or fallback to initial
  useEffect(() => {
    try {
      const stored = localStorage.getItem("maya_admin_products_v1");
      if (stored) {
        setProducts(JSON.parse(stored));
      } else {
        setProducts(initialAdminProducts);
      }

      const storedFacs = localStorage.getItem("maya_admin_factories_v1");
      if (storedFacs) setFactories(JSON.parse(storedFacs));

      const storedCusts = localStorage.getItem("maya_admin_customers_v1");
      if (storedCusts) setCustomers(JSON.parse(storedCusts));
    } catch {
      setProducts(initialAdminProducts);
    }
  }, []);

  // Save to local storage whenever products change
  const saveProducts = (newProducts: AdminProduct[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem("maya_admin_products_v1", JSON.stringify(newProducts));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
  };

  const saveFactories = (newFacs: FactoryRecord[]) => {
    setFactories(newFacs);
    try {
      localStorage.setItem("maya_admin_factories_v1", JSON.stringify(newFacs));
    } catch (e) {
      console.error("Failed to save factories", e);
    }
  };

  const saveCustomers = (newCusts: CustomerRecord[]) => {
    setCustomers(newCusts);
    try {
      localStorage.setItem("maya_admin_customers_v1", JSON.stringify(newCusts));
    } catch (e) {
      console.error("Failed to save customers", e);
    }
  };

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSeason, setFilterSeason] = useState("All");
  const [filterReadyStock, setFilterReadyStock] = useState<"All" | "Yes" | "No">("All");

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [viewingProduct, setViewingProduct] = useState<AdminProduct | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      p.productName.toLowerCase().includes(q) ||
      p.productCode.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.purchaseCode.toLowerCase().includes(q) ||
      p.factoryCode.toLowerCase().includes(q) ||
      p.factoryName.toLowerCase().includes(q) ||
      p.customerName.toLowerCase().includes(q) ||
      p.customerStyleCode.toLowerCase().includes(q);

    const matchCategory =
      filterCategory === "All" || p.category === filterCategory;

    const matchType =
      filterType === "All" ||
      p.productType.toLowerCase().includes(filterType.toLowerCase());

    const matchStatus =
      filterStatus === "All" || p.productStatus === filterStatus;

    const matchSeason =
      filterSeason === "All" || p.season === filterSeason;

    const matchReady =
      filterReadyStock === "All" ||
      p.readyStockAvailability === filterReadyStock;

    return (
      matchQuery &&
      matchCategory &&
      matchType &&
      matchStatus &&
      matchSeason &&
      matchReady
    );
  });

  // Handler: Add or Update Product
  const handleSaveProduct = (product: AdminProduct) => {
    const existingIndex = products.findIndex((p) => p.id === product.id);
    let updated: AdminProduct[];
    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = product;
      showToast(`Updated product "${product.productCode} — ${product.productName}"`);
    } else {
      updated = [product, ...products];
      showToast(`Created new product "${product.productCode} — ${product.productName}"`);
    }
    saveProducts(updated);
    setEditingProduct(null);
  };

  // Handler: Delete Product
  const handleDeleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    if (window.confirm(`Are you sure you want to delete ${target.productCode}?`)) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
      setSelectedIds(selectedIds.filter((item) => item !== id));
      showToast(`Deleted ${target.productCode}`);
    }
  };

  // Handler: Duplicate Product
  const handleDuplicateProduct = (product: AdminProduct) => {
    const newSeq = Math.floor(100 + Math.random() * 899);
    const duplicated: AdminProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      productCode: `ST-${newSeq}`,
      sku: `${product.sku}-CPY`,
      purchaseCode: `PUR-${newSeq}`,
      productName: `${product.productName} (Copy)`,
      customerStyleCode: `C26-${newSeq}`,
      updatedAtDate: `Duplicated from ${product.productCode}`,
    };
    saveProducts([duplicated, ...products]);
    showToast(`Duplicated into new style ${duplicated.productCode}`);
  };

  // Handler: Update Ready Stock from Manager
  const handleUpdateStock = (
    id: string,
    newQty: string,
    availability: "Yes" | "No"
  ) => {
    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            readyStockQuantity: newQty,
            readyStockAvailability: availability,
            updatedAtDate: `Stock updated to ${newQty} pcs on ${new Date().toLocaleDateString()}`,
          }
        : p
    );
    saveProducts(updated);
    showToast("Stock quantity updated successfully");
  };

  // Handler: Toggle Select
  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Handler: Select All
  const handleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  // Handler: Bulk Delete
  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.length} selected products?`
      )
    ) {
      const updated = products.filter((p) => !selectedIds.includes(p.id));
      saveProducts(updated);
      setSelectedIds([]);
      showToast("Selected products deleted");
    }
  };

  // Handler: Bulk Toggle Status
  const handleBulkStatus = (status: "Active" | "Inactive") => {
    const updated = products.map((p) =>
      selectedIds.includes(p.id) ? { ...p, productStatus: status } : p
    );
    saveProducts(updated);
    showToast(`Updated ${selectedIds.length} items to ${status}`);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const rowsToExport =
      selectedIds.length > 0
        ? products.filter((p) => selectedIds.includes(p.id))
        : products;

    const headers = [
      "Product Code",
      "SKU",
      "Purchase Code",
      "Product Name",
      "Product Type",
      "Status",
      "Gender",
      "Age Group",
      "Category",
      "Subcategory",
      "Collection",
      "Season",
      "Fabric",
      "Composition",
      "GSM",
      "Pattern",
      "Primary Color",
      "Size Range",
      "Variants Enabled",
      "Factory Code",
      "Factory Name",
      "EXW Price",
      "FOB Price",
      "Sale Price",
      "FOB Port",
      "MOQ",
      "Ready Stock Availability",
      "Ready Stock Qty",
      "Customer Name",
      "Customer Style Code",
      "Repeat Order",
      "Dev Date",
      "Shipment Date",
    ];

    const csvContent = [
      headers.join(","),
      ...rowsToExport.map((p) =>
        [
          `"${p.productCode}"`,
          `"${p.sku}"`,
          `"${p.purchaseCode}"`,
          `"${p.productName.replace(/"/g, '""')}"`,
          `"${p.productType}"`,
          `"${p.productStatus}"`,
          `"${p.gender}"`,
          `"${p.ageGroup}"`,
          `"${p.category}"`,
          `"${p.subcategory}"`,
          `"${p.collection}"`,
          `"${p.season}"`,
          `"${p.fabric}"`,
          `"${p.fabricComposition}"`,
          `"${p.gsm}"`,
          `"${p.pattern}"`,
          `"${p.color}"`,
          `"${p.sizeRange}"`,
          `"${p.variant}"`,
          `"${p.factoryCode}"`,
          `"${p.factoryName}"`,
          `"${p.factoryPriceEXW}"`,
          `"${p.fobPrice}"`,
          `"${p.salePrice}"`,
          `"${p.fobPort}"`,
          `"${p.moq}"`,
          `"${p.readyStockAvailability}"`,
          `"${p.readyStockQuantity}"`,
          `"${p.customerName}"`,
          `"${p.customerStyleCode}"`,
          `"${p.repeatOrder}"`,
          `"${p.developmentDate.month} ${p.developmentDate.year}"`,
          `"${p.shipmentDate.month} ${p.shipmentDate.year}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `maya_products_catalog_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${rowsToExport.length} products to CSV`);
  };

  // Reset to initial demo data
  const handleResetData = () => {
    if (
      window.confirm(
        "Reset catalog database to default demo records (including ST-1001 Floral Maxi Dress)?"
      )
    ) {
      saveProducts(initialAdminProducts);
      saveFactories(initialFactories);
      saveCustomers(initialCustomers);
      showToast("Reset to factory demo database");
    }
  };

  // Stat computations
  const totalStockUnits = products
    .filter((p) => p.readyStockAvailability === "Yes")
    .reduce(
      (sum, p) =>
        sum + (parseInt(p.readyStockQuantity.replace(/[^0-9]/g, "")) || 0),
      0
    );

  const activeStylesCount = products.filter(
    (p) => p.productStatus === "Active"
  ).length;

  const samplingCount = products.filter(
    (p) =>
      p.productType.toLowerCase().includes("sample") ||
      p.productType.toLowerCase().includes("developed")
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-60 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-blue-700 transition">
                M
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                  MAYA EXPORTS
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                    ERP ADMIN
                  </span>
                </span>
                <span className="text-[11px] text-slate-600 block -mt-0.5">
                  Garments & Textile Sourcing Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Code (ST-1001), SKU, Factory (F26), Buyer..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Top Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Add Product CTA */}
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>

            {/* Back to Live Storefront */}
            <Link
              href="/products"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition"
              title="Open public website storefront"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            {/* Demo Reset */}
            <button
              onClick={handleResetData}
              type="button"
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
              title="Reset Demo Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Admin Avatar */}
            <div className="pl-2 border-l border-slate-200 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER WITH SIDEBAR & CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:block w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 z-30`}
        >
          <div className="p-4 space-y-6">
            {/* Navigation Links */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-3 mb-2">
                Garments Management
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentView("catalog");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentView === "catalog"
                    ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>All Products Catalog</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-white border border-slate-200 text-slate-600">
                  {products.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentView("readystock");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentView === "readystock"
                    ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Box className="w-4 h-4" />
                  <span>Ready Stock Hub</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {products.filter((p) => p.readyStockAvailability === "Yes").length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentView("pipeline");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentView === "pipeline"
                    ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4" />
                  <span>Sample & Dev Pipeline</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-white border border-slate-200 text-slate-600">
                  {samplingCount}
                </span>
              </button>
            </div>

            {/* Sourcing & Relations */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-3 mb-2">
                Supply Chain & Buyers
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentView("factories");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentView === "factories"
                    ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4" />
                  <span>Factory Database (F26)</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-white border border-slate-200 text-slate-600">
                  {factories.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentView("customers");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentView === "customers"
                    ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Buyer Accounts (C26)</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-white border border-slate-200 text-slate-600">
                  {customers.length}
                </span>
              </button>
            </div>

            {/* Quick Sourcing Info Box */}
            {/* <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs space-y-1.5">
              <div className="font-semibold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Auto Code Prefix</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Factory codes prefix with <b>F26-xxx</b> & Buyer style codes prefix with <b>C26-xxx</b>.
              </p>
            </div> */}
          </div>

          {/* Sidebar Footer */}
          {/* <div className="p-4 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <span>Maya Exports v2.6</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div> */}
        </aside>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Products
                </span>
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Package className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {products.length}
              </div>
              <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                <span className="text-emerald-700 font-medium">
                  {activeStylesCount} Active
                </span>
                &bull; {products.length - activeStylesCount} Inactive
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Ready Stock Units
                </span>
                <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Box className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {totalStockUnits.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1">
                Available for immediate FOB loading
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Sampling Pipeline
                </span>
                <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                  <Clock className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {samplingCount}
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                New Development & Counter-samples
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Factory Network
                </span>
                <span className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                  <Building2 className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {factories.length} Mills
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                {customers.length} International Buyer Accounts
              </div>
            </div>
          </div>

          {/* VIEW 1: MAIN PRODUCT CATALOG */}
          {currentView === "catalog" && (
            <div className="space-y-4">
              {/* Filter and Action Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Left: Mobile search + Filters with Shadcn Select */}
                  <div className="flex flex-wrap items-center gap-2 flex-1">
                    {/* Category Filter */}
                    <div className="w-36">
                      <Select
                        value={filterCategory}
                        onValueChange={(val) => setFilterCategory(val)}
                      >
                        <SelectTrigger className="h-8 text-xs bg-slate-50 border-slate-200">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Categories</SelectItem>
                          {Object.keys(categoriesList).map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Product Type Filter */}
                    <div className="w-40">
                      <Select
                        value={filterType}
                        onValueChange={(val) => setFilterType(val)}
                      >
                        <SelectTrigger className="h-8 text-xs bg-slate-50 border-slate-200">
                          <SelectValue placeholder="All Sample Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Sample Types</SelectItem>
                          <SelectItem value="New Developed">New Developed</SelectItem>
                          <SelectItem value="Shipment Sample">Shipment Sample</SelectItem>
                          <SelectItem value="Customer Sample">Customer Sample</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ready Stock Filter */}
                    <div className="w-36">
                      <Select
                        value={filterReadyStock}
                        onValueChange={(val) =>
                          setFilterReadyStock(val as "All" | "Yes" | "No")
                        }
                      >
                        <SelectTrigger className="h-8 text-xs bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Stock Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Stock Status</SelectItem>
                          <SelectItem value="Yes">Ready Stock Only</SelectItem>
                          <SelectItem value="No">Made to Order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status Filter */}
                    <div className="w-32">
                      <Select
                        value={filterStatus}
                        onValueChange={(val) => setFilterStatus(val)}
                      >
                        <SelectTrigger className="h-8 text-xs bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Statuses</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right: View switcher & Actions */}
                  <div className="flex items-center gap-2">
                    {/* Bulk Actions if items selected */}
                    {selectedIds.length > 0 && (
                      <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 text-xs">
                        <span className="font-semibold text-blue-700">
                          {selectedIds.length} selected
                        </span>
                        <button
                          type="button"
                          onClick={() => handleBulkStatus("Active")}
                          className="px-1.5 py-0.5 text-[11px] text-blue-700 hover:underline"
                        >
                          Mark Active
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={() => handleBulkStatus("Inactive")}
                          className="px-1.5 py-0.5 text-[11px] text-slate-600 hover:underline"
                        >
                          Mark Inactive
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={handleBulkDelete}
                          className="px-1.5 py-0.5 text-[11px] text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {/* Export to CSV */}
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition"
                      title="Export filtered records to CSV"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Export CSV</span>
                    </button>

                    {/* View Switcher: Table vs Grid */}
                    <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => setLayoutMode("table")}
                        className={`p-1.5 rounded-md transition ${
                          layoutMode === "table"
                            ? "bg-white text-blue-600 shadow-2xs font-semibold"
                            : "text-slate-400 hover:text-slate-700"
                        }`}
                        title="Dense Table View"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLayoutMode("grid")}
                        className={`p-1.5 rounded-md transition ${
                          layoutMode === "grid"
                            ? "bg-white text-blue-600 shadow-2xs font-semibold"
                            : "text-slate-400 hover:text-slate-700"
                        }`}
                        title="Garment Cards View"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Output */}
              {layoutMode === "table" ? (
                <ProductTable
                  products={filteredProducts}
                  onView={(p) => setViewingProduct(p)}
                  onEdit={(p) => {
                    setEditingProduct(p);
                    setIsFormOpen(true);
                  }}
                  onDuplicate={handleDuplicateProduct}
                  onDelete={handleDeleteProduct}
                  selectedIds={selectedIds}
                  onToggleSelect={handleToggleSelect}
                  onSelectAll={handleSelectAll}
                />
              ) : (
                <ProductGridView
                  products={filteredProducts}
                  onView={(p) => setViewingProduct(p)}
                  onEdit={(p) => {
                    setEditingProduct(p);
                    setIsFormOpen(true);
                  }}
                  onDuplicate={handleDuplicateProduct}
                  onDelete={handleDeleteProduct}
                />
              )}
            </div>
          )}

          {/* VIEW 2: READY STOCK HUB */}
          {currentView === "readystock" && (
            <ReadyStockManager
              products={products}
              onUpdateStock={handleUpdateStock}
              onViewProduct={(p) => setViewingProduct(p)}
            />
          )}

          {/* VIEW 3: SAMPLING PIPELINE */}
          {currentView === "pipeline" && (
            <SamplingPipelineView
              products={products}
              onViewProduct={(p) => setViewingProduct(p)}
              onEditProduct={(p) => {
                setEditingProduct(p);
                setIsFormOpen(true);
              }}
            />
          )}

          {/* VIEW 4: FACTORY DIRECTORY */}
          {currentView === "factories" && (
            <FactoryDirectoryView
              factories={factories}
              onAddFactory={(f) => {
                const updated = [f, ...factories];
                saveFactories(updated);
                showToast(`Factory ${f.code} registered`);
              }}
            />
          )}

          {/* VIEW 5: BUYER / CUSTOMER DIRECTORY */}
          {currentView === "customers" && (
            <CustomerDirectoryView
              customers={customers}
              onAddCustomer={(c) => {
                const updated = [c, ...customers];
                saveCustomers(updated);
                showToast(`Customer account ${c.name} registered`);
              }}
            />
          )}
        </main>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
        factories={factories}
        customers={customers}
      />

      {/* VIEW PRODUCT DETAIL / TECH PACK MODAL */}
      <ProductDetailModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onEdit={(p) => {
          setViewingProduct(null);
          setEditingProduct(p);
          setIsFormOpen(true);
        }}
      />
    </div>
  );
}
