export function BitcoinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden role="img">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <text
        x="16"
        y="22.5"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        B
      </text>
      <line x1="13.6" y1="6.5" x2="13.6" y2="9.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17.4" y1="6.5" x2="17.4" y2="9.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13.6" y1="22.5" x2="13.6" y2="25.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17.4" y1="22.5" x2="17.4" y2="25.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function EthereumIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden role="img">
      <circle cx="16" cy="16" r="16" fill="#3C3C3D" />
      <g fill="#ffffff">
        <polygon points="16,5 16,13.2 9.5,16.5" opacity="0.85" />
        <polygon points="16,5 22.5,16.5 16,13.2" opacity="0.55" />
        <polygon points="16,14.6 16,20.5 9.5,17.9" opacity="0.85" />
        <polygon points="16,14.6 22.5,17.9 16,20.5" opacity="0.55" />
        <polygon points="16,22 16,27 9.6,19.1" opacity="0.85" />
        <polygon points="16,22 22.4,19.1 16,27" opacity="0.55" />
      </g>
    </svg>
  );
}
