"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Factory,
  Filter,
  FolderTree,
  Globe,
  Layers,
  Loader2,
  Package,
  PackageCheck,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  Users,
} from "lucide-react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { adminApi } from "@/lib/admin/api";
import { formatAdminDateTime } from "@/lib/admin/dates";
import type {
  DashboardCategoryDistribution,
  DashboardFactoryWorkloadItem,
  DashboardInventoryAlerts,
  DashboardMarketAndBuyer,
  DashboardRecentActivity,
  DashboardSummary,
} from "@/lib/admin/types";

const CATEGORY_COLORS = ["#2563EB", "#0D9488", "#D97706", "#7C3AED", "#DB2777", "#475569"];
const MARKET_COLORS: Record<string, string> = {
  USA: "#2563EB",
  UK: "#DC2626",
  Europe: "#059669",
  UAE: "#D97706",
};

export default function AdminDashboardPage() {
  // Filter States
  const [range, setRange] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [threshold, setThreshold] = useState<number>(100);

  // Data States
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [categoryDist, setCategoryDist] = useState<DashboardCategoryDistribution | null>(null);
  const [marketBuyer, setMarketBuyer] = useState<DashboardMarketAndBuyer | null>(null);
  const [factories, setFactories] = useState<DashboardFactoryWorkloadItem[]>([]);
  const [inventoryAlerts, setInventoryAlerts] = useState<DashboardInventoryAlerts | null>(null);
  const [recentActivity, setRecentActivity] = useState<DashboardRecentActivity | null>(null);

  // UI States
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>("");

  const loadDashboardData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const [sumRes, catRes, mktRes, facRes, invRes, recRes] = await Promise.all([
        adminApi.getDashboardSummary(),
        adminApi.getCategoryDistribution({
          range: range || undefined,
          season: season || undefined,
        }),
        adminApi.getMarketAndBuyerAnalytics({
          range: range || undefined,
          season: season || undefined,
        }),
        adminApi.getFactoryWorkload(),
        adminApi.getInventoryAlerts(threshold),
        adminApi.getRecentActivity(),
      ]);

      setSummary(sumRes);
      setCategoryDist(catRes);
      setMarketBuyer(mktRes);
      setFactories(facRes);
      setInventoryAlerts(invRes);
      setRecentActivity(recRes);
      setLastRefreshedAt(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load dashboard analytics");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [range, season, threshold]);

  useEffect(() => {
    let cancelled = false;
    loadDashboardData().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [loadDashboardData]);

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header Bar with Filters & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Live Operations
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Real-time B2B export operations, supplier capacity, and buyer intelligence.
              {lastRefreshedAt ? ` Updated at ${lastRefreshedAt}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Range Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
                title="Filter by time range"
              >
                <option value="">All time</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last 1 year</option>
              </select>
            </div>

            {/* Season Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs shadow-2xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
                title="Filter by collection season"
              >
                <option value="">All seasons</option>
                <option value="SS26">SS26</option>
                <option value="AW26">AW26</option>
                <option value="Resort">Resort</option>
                <option value="Core">Core</option>
              </select>
            </div>

            {/* Live Refresh Button */}
            <button
              type="button"
              onClick={() => void loadDashboardData(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh dashboard metrics"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-blue-600" : "text-slate-500"}`} />
              <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
            </button>

            {/* Quick Actions */}
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add product</span>
            </Link>
            <Link
              href="/admin/products/import"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Bulk import</span>
            </Link>
          </div>
        </div>

        {error ? (
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-4">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        {loading && !summary ? (
          <div className="flex flex-col items-center justify-center p-16 text-center space-y-3 bg-white border border-slate-200 rounded-2xl">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm font-medium text-slate-600">Loading live analytics from Maya Exports API...</p>
          </div>
        ) : (
          <>
            {/* ROW 1: KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
              {/* Total Styles */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Total Styles</span>
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {summary?.totalProducts ?? 0}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {summary?.activeProducts ?? 0} active
                  </span>
                  {summary && summary.inactiveProducts > 0 && (
                    <span className="text-slate-400">· {summary.inactiveProducts} draft</span>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Categories</span>
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <FolderTree className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {summary?.totalCategories ?? 0}
                </div>
                <p className="text-[11px] text-slate-500 truncate">Export catalog tree</p>
              </div>

              {/* Ready Stock Available */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Ready Stock</span>
                  <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                    <Boxes className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {summary?.readyStockProducts ?? 0} <span className="text-xs font-normal text-slate-500">styles</span>
                </div>
                <div className="text-[11px] font-medium text-amber-700 bg-amber-50/80 px-1.5 py-0.5 rounded inline-block">
                  {(summary?.readyStockTotalUnits ?? 0).toLocaleString()} units ready
                </div>
              </div>

              {/* New Styles This Month */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">New This Month</span>
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  +{summary?.newProductsThisMonth ?? 0}
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">Recent developments</p>
              </div>

              {/* Manufacturing Units */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Factories</span>
                  <div className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
                    <Factory className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {summary?.totalFactories ?? 0}
                </div>
                <p className="text-[11px] text-slate-500 truncate">Partner manufacturing units</p>
              </div>

              {/* Buyer Accounts */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Buyers & Brands</span>
                  <div className="p-1.5 bg-cyan-50 text-cyan-600 rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {summary?.totalCustomers ?? 0}
                </div>
                <p className="text-[11px] text-slate-500 truncate">Registered export clients</p>
              </div>
            </div>

            {/* ROW 2: Category Distribution & Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Category Breakdown (Donut + Bars) */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-600" />
                      Catalog Distribution
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Product volume by top-level division</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {categoryDist?.totalProducts ?? 0} Total Styles
                  </span>
                </div>

                {categoryDist && categoryDist.byRootCategory.length > 0 ? (
                  <>
                    {/* Visual Segmented Progress Bar */}
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                      {categoryDist.byRootCategory.map((cat, idx) => (
                        <div
                          key={cat.categoryId}
                          style={{
                            width: `${Math.max(2, cat.percentage)}%`,
                            backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
                          }}
                          title={`${cat.name}: ${cat.count} styles (${cat.percentage}%)`}
                          className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                        />
                      ))}
                    </div>

                    {/* Breakdown List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {categoryDist.byRootCategory.map((cat, idx) => (
                        <div
                          key={cat.categoryId}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }}
                            />
                            <span className="text-xs font-semibold text-slate-800 truncate">{cat.name}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-slate-900">{cat.count}</span>
                            <span className="text-[11px] text-slate-500 ml-1.5">({cat.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">No category distribution data available.</p>
                )}
              </div>

              {/* Demographics Mix */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-600" />
                      Demographic Representation
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Style focus across Men, Women & Kids</p>
                  </div>
                </div>

                {categoryDist && categoryDist.byRootCategory.some((r) => r.demographics.length > 0) ? (
                  <div className="space-y-3.5 pt-1">
                    {categoryDist.byRootCategory
                      .filter((r) => r.demographics.length > 0)
                      .map((root) => (
                        <div key={root.categoryId} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-800">{root.name}</span>
                            <span className="text-slate-500 font-medium">{root.count} total</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {["Men", "Women", "Kids"].map((dName) => {
                              const found = root.demographics.find((d) => d.name === dName);
                              const count = found?.count || 0;
                              const pctVal = root.count > 0 ? Math.round((count / root.count) * 100) : 0;
                              return (
                                <div
                                  key={dName}
                                  className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-center"
                                >
                                  <span className="text-[11px] text-slate-500 block">{dName}</span>
                                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                                    {count} <span className="text-[10px] text-slate-400 font-normal">({pctVal}%)</span>
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">No demographic breakdown available.</p>
                )}
              </div>
            </div>

            {/* ROW 3: Export Markets, Buyer Tiers, and Repeat Order Intelligence */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Export Destination Markets */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      Export Markets
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Target geographic destinations</p>
                  </div>
                </div>

                {marketBuyer && marketBuyer.marketDistribution.length > 0 ? (
                  <div className="space-y-3 pt-1">
                    {marketBuyer.marketDistribution.map((m) => {
                      const color = MARKET_COLORS[m.market] || "#6366F1";
                      return (
                        <div key={m.market} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-800">{m.market}</span>
                            <span className="text-slate-600 font-medium">
                              {m.count} styles ({m.percentage}%)
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, m.percentage)}%`, backgroundColor: color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">No export market data yet.</p>
                )}
              </div>

              {/* Buyer Account Tiers */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Buyer Account Tiers
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Classification of export customers</p>
                  </div>
                </div>

                {marketBuyer && marketBuyer.buyerTiers.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {marketBuyer.buyerTiers.map((t) => (
                      <div
                        key={t.tier}
                        className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 flex flex-col justify-between"
                      >
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                          {t.tier}
                        </span>
                        <div className="text-xl font-bold text-slate-900 mt-1">{t.count}</div>
                        <span className="text-[10px] text-slate-400">Registered accounts</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">No customer tiers registered.</p>
                )}
              </div>

              {/* Repeat Order Performance */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      Repeat Order Rate
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Buyer retention on proven styles</p>
                  </div>
                </div>

                {marketBuyer ? (
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-purple-50/70 border border-purple-100">
                      <div>
                        <div className="text-2xl font-bold text-purple-900">
                          {marketBuyer.repeatOrderStats.percentage}%
                        </div>
                        <span className="text-xs text-purple-700 font-medium">Styles re-ordered by buyers</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-purple-900 block">
                          {marketBuyer.repeatOrderStats.repeatStyles} styles
                        </span>
                        <span className="text-[11px] text-purple-600 font-normal">
                          of {marketBuyer.totalProducts} total
                        </span>
                      </div>
                    </div>

                    {/* Breakdown by Repeat Run */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                        Repeat Runs
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {["1st", "2nd", "3rd"].map((num) => {
                          const found = marketBuyer.repeatOrderStats.byOrderNumber.find(
                            (b) => b.repeatOrderNumber === num
                          );
                          return (
                            <div
                              key={num}
                              className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center"
                            >
                              <span className="text-[11px] text-slate-500 block">{num} Repeat</span>
                              <span className="text-xs font-bold text-slate-900 block mt-0.5">
                                {found?.styles ?? 0}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">No repeat order data.</p>
                )}
              </div>
            </div>

            {/* ROW 4: Factory Capacity & Workload Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Manufacturing Facilities & Workload
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Production assignment across partner manufacturing facilities
                  </p>
                </div>
                <Link
                  href="/admin/factories"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <span>Manage factories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {factories.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Factory Code</th>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Location</th>
                        <th className="px-4 py-3 font-semibold">Assigned Styles</th>
                        <th className="px-4 py-3 font-semibold">Ready Stock</th>
                        <th className="px-4 py-3 font-semibold text-right">Capacity Load</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {factories.map((fac) => {
                        const totalStyles = summary?.totalProducts || 1;
                        const pctStyles = Math.round((fac.assignedStylesCount / totalStyles) * 100);
                        return (
                          <tr key={fac.factoryId} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-4 py-3 font-mono font-semibold text-slate-800">
                              {fac.factoryCode}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-900">{fac.factoryName}</td>
                            <td className="px-4 py-3 text-slate-600 capitalize">
                              {fac.country || "—"}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded font-semibold text-slate-900 bg-slate-100">
                                {fac.assignedStylesCount} styles
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {fac.readyStockStylesCount > 0 ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded font-semibold text-amber-700 bg-amber-50 border border-amber-200/60">
                                  {fac.readyStockStylesCount} ready
                                </span>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex items-center gap-2 min-w-[120px] justify-end">
                                <span className="text-slate-600 font-semibold">{pctStyles}%</span>
                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-600 rounded-full"
                                    style={{ width: `${Math.min(100, pctStyles)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">
                  No factories connected yet.{" "}
                  <Link href="/admin/factories" className="text-blue-600 hover:underline">
                    Add your first manufacturing unit.
                  </Link>
                </div>
              )}
            </div>

            {/* ROW 5: Inventory & Ready Stock Alerts + Recent Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Ready Stock & Low Stock Feed */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <PackageCheck className="w-4 h-4 text-amber-600" />
                      Ready Stock & Inventory Alerts
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fast-dispatch inventory requiring warehouse attention
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Threshold:</span>
                    <select
                      value={threshold}
                      onChange={(e) => setThreshold(Number(e.target.value))}
                      className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-800 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value={50}>&lt; 50</option>
                      <option value={100}>&lt; 100</option>
                      <option value={250}>&lt; 250</option>
                    </select>
                  </div>
                </div>

                {inventoryAlerts && inventoryAlerts.lowStockCount > 0 ? (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {inventoryAlerts.lowStockCount} item{inventoryAlerts.lowStockCount === 1 ? "" : "s"} below{" "}
                      {inventoryAlerts.lowStockThreshold} units threshold.
                    </span>
                  </div>
                ) : null}

                {inventoryAlerts && inventoryAlerts.urgentItems.length > 0 ? (
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
                    {inventoryAlerts.urgentItems.map((item, idx) => (
                      <div
                        key={`${item.productCode}-${idx}`}
                        className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-900">{item.productCode}</span>
                            {item.color && (
                              <span className="text-[11px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                                {item.color}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 truncate mt-0.5">{item.title}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-slate-900">
                            {item.readyStockQuantity.toLocaleString()} {item.quantityUnit}
                          </span>
                          <span
                            className={`block text-[10px] font-semibold mt-0.5 ${
                              item.readyStockQuantity <= threshold ? "text-amber-600" : "text-emerald-600"
                            }`}
                          >
                            {item.variantStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">
                    No urgent ready-stock inventory alerts at this time.
                  </p>
                )}
              </div>

              {/* Recent Activity & Latest Styles */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Recent Operations & Styles
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Audit stream of recently updated styles</p>
                  </div>
                </div>

                {/* Last Bulk Import Card */}
                {recentActivity?.lastBulkImport ? (
                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-900 truncate block">
                          Last Import: {recentActivity.lastBulkImport.fileName}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {formatAdminDateTime(recentActivity.lastBulkImport.importedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        {recentActivity.lastBulkImport.ok} ready
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Recent Styles List */}
                {recentActivity && recentActivity.recentStyles.length > 0 ? (
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
                    {recentActivity.recentStyles.slice(0, 5).map((style) => (
                      <div
                        key={style.id}
                        className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-slate-900">
                              {style.productCode}
                            </span>
                            <span className="text-[11px] text-slate-400">· {style.categoryName}</span>
                          </div>
                          <p className="text-xs text-slate-700 truncate mt-0.5">{style.title}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              style.status === "Active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {style.status}
                          </span>
                          <Link
                            href={`/admin/products/${style.id}/edit`}
                            className="p-1 text-slate-400 hover:text-blue-600 rounded"
                            title="Edit style"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">No recent styles updated.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
