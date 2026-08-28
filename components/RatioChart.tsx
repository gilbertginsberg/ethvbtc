"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Range = "30" | "90" | "365" | "max";

const RANGES: { key: Range; label: string }[] = [
  { key: "30", label: "30D" },
  { key: "90", label: "90D" },
  { key: "365", label: "1Y" },
  { key: "max", label: "All-Time" },
];

interface Point {
  timestamp: number;
  ratio: number;
}

export function RatioChart() {
  const [range, setRange] = useState<Range>("365");
  const [points, setPoints] = useState<Point[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/history?range=${range}`)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setPoints(json.points ?? []);
      })
      .catch(() => {
        if (!cancelled) setPoints([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  const peak = points?.reduce<Point | null>(
    (max, p) => (!max || p.ratio > max.ratio ? p : max),
    null
  );

  const chartData = points?.map((p) => ({
    date: new Date(p.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: range === "max" || range === "365" ? "2-digit" : undefined,
    }),
    ratioPct: p.ratio * 100,
    timestamp: p.timestamp,
  }));

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-mono text-sm uppercase tracking-widest text-muted">
          Ratio History
        </h2>
        <div className="flex gap-1 rounded-lg border border-surface-border bg-surface p-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                range === r.key
                  ? "bg-eth text-black"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 rounded-xl border border-surface-border bg-surface p-4 sm:h-96">
        {loading || !chartData ? (
          <div className="flex h-full items-center justify-center font-mono text-xs text-muted">
            Loading chart…
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center font-mono text-xs text-muted">
            Chart data unavailable right now.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="ratioFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-eth)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-eth)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-surface-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                minTickGap={40}
                axisLine={{ stroke: "var(--color-surface-border)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                tickFormatter={(v) => `${v.toFixed(0)}%`}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-surface-border)",
                  borderRadius: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
                formatter={(value) => [`${Number(value).toFixed(2)}%`, "ETH/BTC Ratio"]}
              />
              <Area
                type="monotone"
                dataKey="ratioPct"
                stroke="var(--color-eth)"
                strokeWidth={2}
                fill="url(#ratioFill)"
              />
              {peak && (
                <ReferenceDot
                  x={new Date(peak.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: range === "max" || range === "365" ? "2-digit" : undefined,
                  })}
                  y={peak.ratio * 100}
                  r={4}
                  fill="var(--color-btc)"
                  stroke="none"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      {peak && (
        <p className="mt-2 font-mono text-[11px] text-muted">
          Peak in this range: {(peak.ratio * 100).toFixed(2)}% on{" "}
          {new Date(peak.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </section>
  );
}
