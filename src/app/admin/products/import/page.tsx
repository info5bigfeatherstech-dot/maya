"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Download, FileSpreadsheet, FileArchive, Loader2 } from "lucide-react";
import { AdminBackLink } from "@/components/admin/layout/AdminBackLink";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import { previewSpreadsheet, type ImportPreviewRow } from "@/lib/admin/importPreview";
import type { ProductImportResult } from "@/lib/admin/types";

const ZIP_MAX_BYTES = 80 * 1024 * 1024;

export default function ImportProductsPage() {
  const [sheet, setSheet] = useState<File | null>(null);
  const [zip, setZip] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreviewRow[]>([]);
  const [previewNote, setPreviewNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ProductImportResult | null>(null);

  const families = useMemo(() => {
    const seen = new Set<string>();
    for (const row of preview) {
      const code = row.productCode.trim().toUpperCase();
      const match = code.match(/^(.*)-\d{1,3}$/);
      if (match?.[1]) seen.add(match[1]);
    }
    return seen.size;
  }, [preview]);

  const handleSheet = async (file: File | null) => {
    setSheet(file);
    setResult(null);
    setError("");
    setPreview([]);
    setPreviewNote("");
    if (!file) return;
    const next = await previewSpreadsheet(file);
    setPreview(next.rows.slice(0, 40));
    if (next.error) setPreviewNote(next.error);
    else if (next.rows.length > 40) setPreviewNote(`Showing first 40 of ${next.rows.length} rows`);
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
    if (zip && zip.size > ZIP_MAX_BYTES) {
      setError("The ZIP file must be 80MB or smaller");
      return;
    }

    setSubmitting(true);
    setError("");
    setResult(null);

    const form = new FormData();
    form.append("sheet", sheet);
    if (zip) form.append("imagesZip", zip);

    try {
      const imported = await adminApi.importProducts(form);
      setResult(imported);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to import products");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminShell>
      <div className="max-w-5xl space-y-5">
        <div className="space-y-3">
          <AdminBackLink href="/admin/products" label="Back to products" />
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Bulk import</h1>
              <p className="text-sm text-slate-500 mt-1">
                One spreadsheet row is one coded variant. Rows like TST-901-1 and TST-901-2 become one product.
                Images go in a ZIP whose folders are named with those same codes.
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
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">TST-901-2</code>. Do not add a separate code
              column.
            </li>
            <li>
              Fill name, title, description, and categoryPath on the primary <strong>-1</strong> row. Later family rows
              only need their own title/description/attributes if they differ.
            </li>
            <li>
              Use one attributes cell, for example{" "}
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">Color=Red; Size=XS, SM, L</code>. Commas inside
              one key become sub-variants that share parent images. Only one key per row may list multiple values.
            </li>
            <li>
              ZIP folders must match those codes: <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">TST-901-1/</code>{" "}
              for primary images, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">TST-901-2/</code> for extras,
              optional <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">TST-901-1-3/</code> to override the 3rd
              sub-variant. JPG, PNG, or WEBP, max 5 per folder. Images are compressed on upload.
            </li>
            <li>Customers and factories are skipped in bulk import. Add them on the product edit screen if needed.</li>
            <li>Existing product codes are skipped and listed in the error report. Other rows still import.</li>
          </ul>
        </div>

        <form onSubmit={(event) => void handleSubmit(event)} className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-xs font-semibold text-slate-700">Spreadsheet (CSV or XLSX)</span>
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
              <span className="text-xs font-semibold text-slate-700">Images ZIP (optional)</span>
              <span className="flex items-center gap-2 h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600">
                <FileArchive className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="file"
                  accept=".zip,application/zip"
                  className="w-full text-xs file:mr-3 file:border-0 file:bg-white file:px-2 file:py-1 file:rounded file:text-xs file:font-medium"
                  onChange={(event) => handleZip(event.target.files?.[0] || null)}
                />
              </span>
            </label>
          </div>

          {previewNote ? <p className="text-xs text-slate-500">{previewNote}</p> : null}

          {preview.length ? (
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="min-w-full text-xs">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="text-left font-medium px-3 py-2">Row</th>
                    <th className="text-left font-medium px-3 py-2">Product code</th>
                    <th className="text-left font-medium px-3 py-2">Name</th>
                    <th className="text-left font-medium px-3 py-2">Title</th>
                    <th className="text-left font-medium px-3 py-2">Category</th>
                    <th className="text-left font-medium px-3 py-2">Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row) => (
                    <tr key={`${row.row}-${row.productCode}`} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-400">{row.row}</td>
                      <td className="px-3 py-2 font-medium text-slate-800">{row.productCode || "—"}</td>
                      <td className="px-3 py-2 text-slate-600">{row.name || "—"}</td>
                      <td className="px-3 py-2 text-slate-600">{row.title || "—"}</td>
                      <td className="px-3 py-2 text-slate-600">{row.categoryPath || "—"}</td>
                      <td className="px-3 py-2 text-slate-600 max-w-xs truncate">{row.attributes || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-3 py-2 text-[11px] text-slate-500 border-t border-slate-100">
                {preview.length} row{preview.length === 1 ? "" : "s"}
                {families ? ` · about ${families} product famil${families === 1 ? "y" : "ies"}` : ""}
              </p>
            </div>
          ) : null}

          {error ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting || !sheet}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-60"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              {submitting ? "Importing..." : "Import products"}
            </button>
            <p className="text-xs text-slate-500">Large ZIPs can take a few minutes while images compress.</p>
          </div>
        </form>

        {result ? (
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Import report</h2>
              <p className="text-sm text-slate-500 mt-1">
                Created {result.summary.created} of {result.summary.families} products
                {result.summary.failed ? ` · ${result.summary.failed} failed` : ""}
                {result.summary.imagesQueued ? ` · ${result.summary.imagesQueued} images queued` : ""}
              </p>
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
                      <th className="text-left font-medium px-3 py-2">Code</th>
                      <th className="text-left font-medium px-3 py-2">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.failed.map((item, index) => (
                      <tr key={`${item.row}-${item.productCode}-${index}`} className="border-t border-red-50">
                        <td className="px-3 py-2 text-slate-400">{item.row || "—"}</td>
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

            {result.skippedFolders.length ? (
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">ZIP folders not used</p>
                <ul className="text-xs text-slate-500 space-y-1">
                  {result.skippedFolders.map((item, index) => (
                    <li key={`${item.folder}-${index}`}>
                      {item.folder}: {item.reason}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}
