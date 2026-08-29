"use client";

import type { ReactNode } from "react";
import { useLiveData } from "@/lib/useLiveData";
import type { ApiData } from "@/lib/types";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { StatCards } from "./StatCards";
import { ComparisonTable } from "./ComparisonTable";
import { FunStats } from "./FunStats";

export function LiveDashboard({
  initialData,
  children,
}: {
  initialData: ApiData;
  children?: ReactNode;
}) {
  const data = useLiveData(initialData);
  return (
    <>
      <Header data={data} />
      <Hero data={data} />
      <StatCards data={data} />
      {children}
      <ComparisonTable data={data} />
      <FunStats data={data} />
    </>
  );
}
