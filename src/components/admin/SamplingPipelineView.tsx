"use client";

import React from "react";
import { AdminProduct } from "@/types/adminProduct";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Building2,
  Tag,
  Eye,
  FileCheck,
} from "lucide-react";

interface SamplingPipelineViewProps {
  products: AdminProduct[];
  onViewProduct: (product: AdminProduct) => void;
  onEditProduct: (product: AdminProduct) => void;
}

const pipelineStages = [
  {
    key: "New Developed",
    title: "New Development",
    desc: "Initial concept, CAD & counter-sample testing",
    color: "blue",
  },
  {
    key: "Customer Sample",
    title: "Customer Sample",
    desc: "Submitted to international buyer for fit approval",
    color: "amber",
  },
  {
    key: "Shipment Sample",
    title: "Shipment Sample",
    desc: "Pre-shipment inspection & sealed production gold seal",
    color: "purple",
  },
  {
    key: "Production Run",
    title: "Bulk Production",
    desc: "Bulk fabric cutting, stitching, and carton packing",
    color: "emerald",
  },
];

export function SamplingPipelineView({
  products,
  onViewProduct,
  onEditProduct,
}: SamplingPipelineViewProps) {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <h3 className="text-base font-bold text-slate-900">
          Sample & Development Workflow Tracker
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Monitor styles through sampling milestones from initial development date to final port shipment date.
        </p>
      </div>

      {/* Kanban / Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {pipelineStages.map((stage) => {
          const itemsInStage = products.filter((p) => {
            const currentType = p.productType.trim().toLowerCase();
            return currentType.includes(stage.key.toLowerCase());
          });

          return (
            <div
              key={stage.key}
              className="bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col overflow-hidden"
            >
              {/* Column Header */}
              <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 truncate max-w-[170px]">
                    {stage.desc}
                  </p>
                </div>
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                  {itemsInStage.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[70vh]">
                {itemsInStage.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No styles currently in this stage.
                  </div>
                ) : (
                  itemsInStage.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs hover:shadow-xs hover:border-blue-300 transition space-y-2.5"
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-blue-700">
                          {p.productCode}
                        </span>
                        <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                          {p.season}
                        </span>
                      </div>

                      {/* Product Name & Details */}
                      <div>
                        <h5
                          onClick={() => onViewProduct(p)}
                          className="text-xs font-semibold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                        >
                          {p.productName}
                        </h5>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {p.category} &bull; {p.fabricComposition || p.fabric}
                        </p>
                      </div>

                      {/* Buyer & Factory tags */}
                      <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Buyer:</span>
                          <span className="font-medium text-slate-800">
                            {p.customerName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Factory:</span>
                          <span className="font-mono text-blue-600 font-semibold">
                            {p.factoryCode}
                          </span>
                        </div>
                      </div>

                      {/* Shipment & Dates */}
                      <div className="p-2 rounded bg-slate-50 border border-slate-100 text-[10px] space-y-1">
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Dev Date:</span>
                          <span className="font-medium text-slate-700">
                            {p.developmentDate.month} {p.developmentDate.year}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-blue-600 font-semibold">
                          <span>Target Ship:</span>
                          <span>
                            {p.shipmentDate.month} {p.shipmentDate.year}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-1 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => onViewProduct(p)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> Tech Spec
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditProduct(p)}
                          className="text-[11px] text-slate-600 hover:text-slate-900 font-medium"
                        >
                          Edit Stage
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
