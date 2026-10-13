"use client";

import React from "react";

export function OrdersSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-gray-200" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-20 rounded-full bg-gray-200" />
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </div>
                <div className="h-3 w-40 rounded bg-gray-100" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-24 rounded bg-gray-200" />
              <div className="h-8 w-20 rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
