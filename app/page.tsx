import { fetchLiveData } from "@/lib/coingecko";
import { LiveDashboard } from "@/components/LiveDashboard";
import { AdSlot } from "@/components/AdSlot";
import { RatioChart } from "@/components/RatioChart";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export const revalidate = 60;

export default async function Home() {
  let initialData;
  try {
    initialData = await fetchLiveData();
  } catch {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-lg italic text-ink-soft">
          Live data is temporarily unavailable. Please check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LiveDashboard initialData={initialData}>
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <AdSlot slotId="in-content-1" />
        </div>
      </LiveDashboard>

      <RatioChart />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <AdSlot slotId="in-content-2" />
      </div>

      <Faq />
      <Footer />
    </div>
  );
}
