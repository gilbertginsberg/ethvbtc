interface AdSlotProps {
  slotId: string;
  className?: string;
  minHeight?: number;
  label?: string;
}

/**
 * Reserved, fixed-height placeholder for ad networks. Swapping the network
 * (AdSense, Ezoic, Coinzilla, ...) later only means filling this component in —
 * layout never shifts because the container height is set up front.
 */
export function AdSlot({ slotId, className = "", minHeight = 90, label = "Advertisement" }: AdSlotProps) {
  return (
    <div
      data-ad-slot={slotId}
      style={{ minHeight }}
      className={`w-full flex items-center justify-center rounded-2xl border border-dashed border-hairline bg-surface/60 text-xs text-muted ${className}`}
    >
      {label}
    </div>
  );
}
