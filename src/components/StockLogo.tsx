import React from "react";

interface StockLogoProps {
  ticker: string;
  className?: string;
  size?: number;
}

export const StockLogo: React.FC<StockLogoProps> = ({
  ticker,
  className = "w-6 h-6",
  size = 24,
}) => {
  const sym = ticker.toUpperCase();

  switch (sym) {
    case "NVDA":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#0A0A0A" />
          <path
            d="M5.5 12.2c0-3.3 2.6-6 5.8-6 2.3 0 4.3 1.4 5.2 3.4-.6-.3-1.3-.5-2-.5-2.2 0-4 1.8-4 4 0 1.5.8 2.8 2 3.5-.9 1.4-2.5 2.3-4.3 2.3-3 0-5.4-2.4-5.4-5.4l2.7-1.3z"
            fill="#76B900"
          />
          <path
            d="M13.2 8.7c1.7 0 3.2 1.4 3.2 3.2 0 1.2-.7 2.3-1.7 2.8-.7.4-1.5.2-1.5-.7 0-.5.4-.9.9-1.2.3-.2.5-.5.5-.9 0-.8-.6-1.4-1.4-1.4-.4 0-.8.2-1 .5l-1.3-.8c.6-.9 1.4-1.5 2.4-1.5z"
            fill="#76B900"
          />
          <path
            d="M17.8 7.3c1.3 1.3 2.1 3 2.1 5s-.8 3.8-2.1 5.1c-.5-.4-1-.7-1.6-1 1-1 1.7-2.4 1.7-4s-.7-3-1.7-4.1c.6-.3 1.1-.6 1.6-1z"
            fill="#76B900"
          />
        </svg>
      );

    case "TSLA":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#0A0A0A" />
          <path
            d="M12 7.2c2.1 0 4.3.4 6 1.3-.2.5-.4 1.1-.8 1.5-1.5-.7-3.3-1-5.2-1-1.9 0-3.7.3-5.2 1-.4-.4-.6-1-.8-1.5 1.7-.9 3.9-1.3 6-1.3z"
            fill="#E82127"
          />
          <path
            d="M12 9.5c.3 0 2.2.1 3.5.7l-.6 1.5c-.9-.4-2-.6-2.9-.6v8.4h-1.9v-8.4c-.9 0-2 .2-2.9.6l-.6-1.5c1.3-.6 3.2-.7 3.5-.7z"
            fill="#E82127"
          />
          <path
            d="M4.5 7.5C6.7 6.1 9.3 5.4 12 5.4s5.3.7 7.5 2.1c-.2.4-.4.8-.6 1.1-2-1.2-4.3-1.8-6.9-1.8s-4.9.6-6.9 1.8c-.2-.3-.4-.7-.6-1.1z"
            fill="#E82127"
          />
        </svg>
      );

    case "AAPL":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#1C1C1E" />
          <path
            d="M14.7 4.2c.7-.9 1.2-2.1 1.1-3.2-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.5 2.8-1.3z"
            fill="#FFFFFF"
          />
          <path
            d="M16.8 12.3c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2.1-1.6-.2-3.2.9-4 .9-.8 0-2.1-.9-3.5-.9-1.8 0-3.4 1-4.3 2.6-1.9 3.2-.5 8 1.3 10.7.9 1.3 2 2.7 3.4 2.6 1.3-.1 1.9-.8 3.5-.8s2.1.8 3.5.8c1.4 0 2.4-1.3 3.3-2.6 1-1.5 1.4-2.9 1.5-3-.1 0-2.8-1.1-2.8-4.3z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "MSTR":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#0A0A0A" />
          <path
            d="M5 6.5h3.2l3.8 6.5 3.8-6.5H19v11h-3.2v-6.3l-3.8 6.3h-1l-3.8-6.3v6.3H5V6.5z"
            fill="#D9232E"
          />
        </svg>
      );

    case "COIN":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#0052FF" />
          <path
            d="M12 4.5A7.5 7.5 0 1 0 19.5 12 7.5 7.5 0 0 0 12 4.5zm0 11.2a3.7 3.7 0 1 1 3.7-3.7 3.7 3.7 0 0 1-3.7 3.7z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "AMZN":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#141920" />
          <path
            d="M8.2 12.3c0 .8.5 1.3 1.3 1.3.8 0 1.5-.5 1.5-1.3V8.8H8.2v3.5zm3.9 2.1c-.5.4-1.2.6-2 .6-1.8 0-2.9-1.2-2.9-3V8.8H6V7.4h1.2V5.7h1.4v1.7h2.4v1.4h-2.4v3.3c0 .9.5 1.4 1.3 1.4.6 0 1-.2 1.3-.5l.9 1.4z"
            fill="#FFFFFF"
          />
          <path
            d="M5.5 16.5c3.2 2.2 7.8 2.2 11.4.2.3-.2.6.2.3.4-3.9 2.2-8.9 2.2-12.2-.2-.2-.2.1-.6.5-.4z"
            fill="#FF9900"
          />
          <path
            d="M17.4 16.3c.4-.3.9-.7 1.1-1.1.1-.1 0-.3-.1-.3-.4.1-.9.3-1.4.3-.2.3.1.8.4 1.1z"
            fill="#FF9900"
          />
        </svg>
      );

    case "MSFT":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#0A0A0A" />
          <rect x="5.5" y="5.5" width="5.8" height="5.8" fill="#F25022" />
          <rect x="12.7" y="5.5" width="5.8" height="5.8" fill="#7FBA00" />
          <rect x="5.5" y="12.7" width="5.8" height="5.8" fill="#00A4EF" />
          <rect x="12.7" y="12.7" width="5.8" height="5.8" fill="#FFB900" />
        </svg>
      );

    case "BTC":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#F7931A" />
          <path
            d="M16.3 10.4c.2-1.3-.8-2-2.2-2.5l.4-1.8-1.1-.3-.4 1.7c-.3-.1-.6-.2-.9-.2l.4-1.7-1.1-.3-.4 1.8c-.2 0-.5-.1-.7-.2l-1.5-.4-.3 1.2s.8.2.8.2c.4.1.5.4.5.6l-.5 2.1c0 0 .1 0 .1.1-.1 0-.1 0-.1-.1l-.7 2.9c-.1.2-.2.4-.6.3 0 0-.8-.2-.8-.2l-.6 1.3 1.4.4c.3.1.5.2.8.2l-.4 1.8 1.1.3.4-1.7c.3.1.6.2.9.2l-.4 1.7 1.1.3.4-1.8c1.9.4 3.3.2 3.9-1.5.5-1.4 0-2.2-.9-2.7.7-.4 1.2-1 1.1-2.1zm-2 4.6c-.4 1.4-2.8.6-3.6.4l.6-2.6c.8.2 3.3.6 3 2.2zm.4-4.7c-.3 1.3-2.3.6-2.9.5l.6-2.3c.7.2 2.7.5 2.3 1.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "ETH":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#1C1E2B" />
          <path
            d="M12 4.5l-4.5 7.5L12 14.5l4.5-2.5L12 4.5z"
            fill="#627EEA"
          />
          <path
            d="M7.5 13l4.5 6.5 4.5-6.5-4.5 2.5-4.5-2.5z"
            fill="#627EEA"
            fillOpacity="0.8"
          />
        </svg>
      );

    case "SOL":
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#0A0A0A" />
          <path
            d="M6 7.2h9.5l2.5 2.3H8.5L6 7.2zm0 7.3h9.5l2.5 2.3H8.5L6 14.5zm12-3.7H8.5L6 13.1h9.5l2.5-2.3z"
            fill="url(#solGradient)"
          />
          <defs>
            <linearGradient id="solGradient" x1="6" y1="7" x2="18" y2="17" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00FFA3" />
              <stop offset="1" stopColor="#DC1FFF" />
            </linearGradient>
          </defs>
        </svg>
      );

    default:
      return (
        <div
          style={{ width: size, height: size }}
          className={`rounded flex items-center justify-center font-mono font-bold text-[10px] bg-[#FF6B00] text-white shrink-0 ${className}`}
        >
          {sym.slice(0, 3)}
        </div>
      );
  }
};
