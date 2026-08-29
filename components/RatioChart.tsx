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
  { key: "max", label: "All-time" },
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
    <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-medium text-xs uppercase tracking-[0.2em] text-muted">
            Interest over time
          </p>
          <h2 className="mt-1 font-serif text-2xl italic">The ratio, charted</h2>
        </div>
        <div className="flex gap-1 rounded-full border border-hairline bg-surface p-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                range === r.key
                  ? "bg-ink text-paper"
                  : "text-muted hover:text-ink"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 rounded-2xl border border-hairline bg-surface p-4 sm:h-96 sm:p-6">
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
                  <stop offset="0%" stopColor="var(--color-eth)" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="var(--color-eth)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-hairline)" strokeDasharray="2 4" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                minTickGap={40}
                axisLine={{ stroke: "var(--color-hairline)" }}
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
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
                labelStyle={{ color: "var(--color-muted)" }}
                formatter={(value) => [`${Number(value).toFixed(2)}%`, "ETH / BTC"]}
              />
              <Area
                type="monotone"
                dataKey="ratioPct"
                stroke="var(--color-eth)"
                strokeWidth={2.25}
                fill="url(#ratioFill)"
              />
              {peak && (
                <ReferenceDot
                  x={labelFor(peak.timestamp)}
                  y={peak.ratio * 100}
                  r={4.5}
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
