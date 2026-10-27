"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, FileSpreadsheet, FileArchive, Loader2 } from "lucide-react";
import { AdminBackLink } from "@/components/admin/layout/AdminBackLink";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import type { ProductImportPreview, ProductImportResult } from "@/lib/admin/types";

const ZIP_MAX_BYTES = 80 * 1024 * 1024;

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function ImportProductsPage() {
  const [sheet, setSheet] = useState<File | null>(null);
  const [zip, setZip] = useState<File | null>(null);
  const [preview, setPreview] = useState<ProductImportPreview | null>(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ProductImportResult | null>(null);

  const handleSheet = async (file: File | null) => {
    setSheet(file);
    setZip(null);
    setResult(null);
    setError("");
    setPreview(null);
    if (!file) return;

    setChecking(true);
    const form = new FormData();
    form.append("sheet", file);
    try {
      const next = await adminApi.previewImport(form);
      setPreview(next);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to check the spreadsheet");
    } finally {
      setChecking(false);
    }
  };

  const handleZip = (file: File | null) => {
    setZip(file);
    setResult(null);
    setError("");
    if (file && file.size > ZIP_MAX_BYTES) {
      setError("The ZIP file must be 80MB or smaller");
      setZip(null);
    }
  };

  const handleTemplate = async () => {
    setDownloading(true);
    setError("");
    try {
      await adminApi.downloadImportTemplate();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to download the template");
    } finally {
      setDownloading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sheet) {
      setError("Choose a CSV or Excel file");
      return;
    }
    if (!zip) {
      setError("An images ZIP is required");
      return;
    }
    if (zip.size > ZIP_MAX_BYTES) {
      setError("The ZIP file must be 80MB or smaller");
      return;
    }

    setSubmitting(true);
    setError("");
    setResult(null);

    const form = new FormData();
    form.append("sheet", sheet);
    form.append("imagesZip", zip);

    try {
      const imported = await adminApi.importProducts(form);
      setResult(imported);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to import products");
    } finally {
      setSubmitting(false);
    }
  };

  const canImport = Boolean(sheet && zip && preview && preview.summary.ok > 0 && !checking && !submitting);
  const previewIssues = preview?.issues.length || 0;

  return (
    <AdminShell>
      <div className="max-w-5xl space-y-5">
        <div className="space-y-3">
          <AdminBackLink href="/admin/products" label="Back to products" />
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Bulk import</h1>
              <p className="text-sm text-slate-500 mt-1">
                Upload the spreadsheet first. We check every row before you add the images ZIP. ZIP folders must
                match variant codes. If anything is wrong, download the error file.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void handleTemplate()}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading ? "Downloading..." : "Download CSV template"}
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">How to prepare the files</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Put the full variant code in <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">productCode</code>
              : <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">TST-901-1</code>, then{" "}
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">TST-901-2</code>.
            </li>
            <li>
              Fill name, title, description, and categoryPath on the primary <strong>-1</strong> row.
            </li>
            <li>
              Attributes can be anything:{" "}
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">Color=Red; Size=XS, SM, L</code> or{" "}
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">Plating=Gold, Silver</code>. Only one key per
              row may list multiple values.
            </li>
            <li>
              ZIP is required. Folders must match those codes. Optional sub override:{" "}
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">TST-901-1-3/</code>.
            </li>
          </ul>
        </div>

        <form onSubmit={(event) => void handleSubmit(event)} className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-xs font-semibold text-slate-700">1. Spreadsheet (CSV or XLSX)</span>
              <span className="flex items-center gap-2 h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600">
                <FileSpreadsheet className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="file"
                  accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  className="w-full text-xs file:mr-3 file:border-0 file:bg-white file:px-2 file:py-1 file:rounded file:text-xs file:font-medium"
                  onChange={(event) => void handleSheet(event.target.files?.[0] || null)}
                />
              </span>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-semibold text-slate-700">2. Images ZIP (required)</span>
              <span className="flex items-center gap-2 h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600">
                <FileArchive className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="file"
                  accept=".zip,application/zip"
                  disabled={!preview || checking}
                  className="w-full text-xs file:mr-3 file:border-0 file:bg-white file:px-2 file:py-1 file:rounded file:text-xs file:font-medium disabled:opacity-50"
                  onChange={(event) => handleZip(event.target.files?.[0] || null)}
                />
              </span>
              {!preview ? (
                <span className="text-[11px] text-slate-500">ZIP unlocks after the spreadsheet check finishes.</span>
              ) : null}
            </label>
          </div>

          {checking ? <p className="text-xs text-slate-500">Checking spreadsheet rows...</p> : null}

          {preview ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm text-slate-600">
                  {preview.summary.families} product{preview.summary.families === 1 ? "" : "s"} · {preview.summary.ok}{" "}
                  ready
                  {previewIssues ? ` · ${previewIssues} problem${previewIssues === 1 ? "" : "s"}` : ""}
                </p>
                {previewIssues ? (
                  <button
                    type="button"
                    onClick={() => downloadCsv("maya-exports-import-errors.csv", preview.errorCsv)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download error file
                  </button>
                ) : (
                  <p className="text-xs text-emerald-700">No spreadsheet mistakes found.</p>
                )}
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left font-medium px-3 py-2">Row</th>
                      <th className="text-left font-medium px-3 py-2">Status</th>
                      <th className="text-left font-medium px-3 py-2">Product code</th>
                      <th className="text-left font-medium px-3 py-2">Name</th>
                      <th className="text-left font-medium px-3 py-2">Category</th>
                      <th className="text-left font-medium px-3 py-2">Problem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.rows.map((row) => (
                      <tr
                        key={`${row.row}-${row.productCode}`}
                        className={`border-t ${row.ok ? "border-slate-100" : "border-red-100 bg-red-50/60"}`}
                      >
                        <td className="px-3 py-2 text-slate-400">{row.row}</td>
                        <td className={`px-3 py-2 font-medium ${row.ok ? "text-emerald-700" : "text-red-700"}`}>
                          {row.ok ? "OK" : "Error"}
                        </td>
                        <td className="px-3 py-2 font-medium text-slate-800">{row.productCode || "—"}</td>
                        <td className="px-3 py-2 text-slate-600">{row.name || row.title || "—"}</td>
                        <td className="px-3 py-2 text-slate-600">{row.categoryPath || "—"}</td>
                        <td className="px-3 py-2 text-red-700 max-w-sm">{row.issues.join(" · ") || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!canImport}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-60"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              {submitting ? "Importing..." : "Import products"}
            </button>
            <p className="text-xs text-slate-500">
              Import stays disabled until the sheet has at least one valid product and a ZIP is attached.
            </p>
          </div>
        </form>

        {result ? (
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Import report</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Created {result.summary.created} of {result.summary.families} products
                  {result.summary.failed ? ` · ${result.summary.failed} could not be imported` : ""}
                  {result.summary.imagesQueued ? ` · ${result.summary.imagesQueued} images queued` : ""}
                </p>
              </div>
              {result.failed.length ? (
                <button
                  type="button"
                  onClick={() => downloadCsv("maya-exports-import-errors.csv", result.errorCsv)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download error file
                </button>
              ) : null}
            </div>

            {result.created.length ? (
              <div>
                <p className="text-xs font-semibold text-emerald-700 mb-2">Created</p>
                <ul className="space-y-1 text-sm">
                  {result.created.map((product) => (
                    <li key={product.id} className="flex items-center justify-between gap-3">
                      <span className="text-slate-700">
                        <span className="font-medium">{product.productCode}</span>
                        {product.sku ? ` · ${product.sku}` : ""} — {product.name}
                      </span>
                      <Link href={`/admin/products/${product.id}/edit`} className="text-xs text-blue-600 hover:underline">
                        Edit
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {result.failed.length ? (
              <div className="overflow-x-auto border border-red-100 rounded-lg">
                <table className="min-w-full text-xs">
                  <thead className="bg-red-50 text-red-700">
                    <tr>
                      <th className="text-left font-medium px-3 py-2">Row</th>
                      <th className="text-left font-medium px-3 py-2">Source</th>
                      <th className="text-left font-medium px-3 py-2">Code</th>
                      <th className="text-left font-medium px-3 py-2">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.failed.map((item, index) => (
                      <tr key={`${item.row}-${item.productCode}-${index}`} className="border-t border-red-50">
                        <td className="px-3 py-2 text-slate-400">{item.row || "—"}</td>
                        <td className="px-3 py-2 text-slate-600">{item.source}</td>
                        <td className="px-3 py-2 font-medium text-slate-800">{item.productCode}</td>
                        <td className="px-3 py-2 text-red-700">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {result.warnings.length ? (
              <ul className="text-xs text-amber-700 space-y-1">
                {result.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}
