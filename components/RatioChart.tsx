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
  { key: "max", label: "All time" },
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

  const labelFor = (ts: number) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: range === "max" || range === "365" ? "2-digit" : undefined,
    });

  const chartData = points?.map((p) => ({
    date: labelFor(p.timestamp),
    ratioPct: p.ratio * 100,
    timestamp: p.timestamp,
  }));

  return (
    <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-ink-soft">Ratio over time</h2>
        <div className="flex gap-1 rounded-full border border-border p-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                range === r.key
                  ? "bg-eth-soft text-eth"
                  : "text-muted hover:bg-surface-2"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 rounded-2xl border border-border bg-surface p-4 sm:h-96 sm:p-6">
        {loading || !chartData ? (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            Loading chart…
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            Chart data unavailable right now.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="ratioFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-eth)" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="var(--color-eth)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                minTickGap={40}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                tickFormatter={(v) => `${v.toFixed(0)}%`}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                  boxShadow: "0 1px 3px 0 rgba(60,64,67,0.3)",
                }}
                labelStyle={{ color: "var(--color-muted)" }}
                formatter={(value) => [`${Number(value).toFixed(2)}%`, "ETH / BTC"]}
              />
              <Area
                type="monotone"
                dataKey="ratioPct"
                stroke="var(--color-eth)"
                strokeWidth={2.5}
                fill="url(#ratioFill)"
                activeDot={{ r: 4, stroke: "var(--color-surface)", strokeWidth: 2 }}
              />
              {peak && (
                <ReferenceDot
                  x={labelFor(peak.timestamp)}
                  y={peak.ratio * 100}
                  r={4}
                  fill="var(--color-accent)"
                  stroke="var(--color-surface)"
                  strokeWidth={2}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      {peak && (
        <p className="mt-3 text-xs text-muted">
          Peak in this range: <span className="text-ink-soft">{(peak.ratio * 100).toFixed(2)}%</span> on{" "}
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
