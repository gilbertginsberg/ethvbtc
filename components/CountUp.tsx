"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  decimals?: number;
  durationMs?: number;
  format?: (v: number) => string;
  className?: string;
}

export function CountUp({ value, decimals = 2, durationMs = 600, format, className }: CountUpProps) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const from = prevValue.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        prevValue.current = to;
      }
    }
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, durationMs]);

  const text = format ? format(display) : display.toFixed(decimals);
  return <span className={className}>{text}</span>;
}
