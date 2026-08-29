"use client";

import { useEffect, useState } from "react";
import type { ApiData } from "./types";

const POLL_MS = 60_000;

export function useLiveData(initialData: ApiData) {
  const [data, setData] = useState<ApiData>(initialData);

  useEffect(() => {
    let cancelled = false;
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/data", { cache: "no-store" });
        if (!res.ok) return;
        const json: ApiData = await res.json();
        if (!cancelled) setData(json);
      } catch {
        // keep showing last-known-good data on transient errors
      }
    }, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return data;
}
