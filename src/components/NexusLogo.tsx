"use client";

import React from "react";

interface NexusLogoProps {
  size?: number;
  showWordmark?: boolean;
  showTagline?: boolean;
  theme?: "light" | "dark";
  className?: string;
  onClick?: () => void;
}

export const NexusLogo: React.FC<NexusLogoProps> = ({
  size = 32,
  showWordmark = true,
  showTagline = false,
  theme = "light",
  className = "",
  onClick,
}) => {
  const isDark = theme === "dark";

  // Aspect ratio of the vector icon mark is 180 / 140 (~1.28)
  const iconWidth = size * 1.25;
  const iconHeight = size;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center space-x-2.5 select-none ${
        onClick ? "cursor-pointer group" : ""
      } ${className}`}
    >
      {/* Precision Vector Icon Mark */}
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 180 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      >
        <defs>
          {/* Cyan to Electric Blue Gradient for Left Mountain Chevron */}
          <linearGradient id="nexusCyanGradient" x1="0%" y1="100%" x2="60%" y2="0%">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="50%" stopColor="#00C0FA" />
            <stop offset="100%" stopColor="#007CF0" />
          </linearGradient>

          {/* Deep Royal Blue for Bottom Chevron Leg */}
          <linearGradient id="nexusBlueGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="60%" stopColor="#1E6BFF" />
            <stop offset="100%" stopColor="#4A88FF" />
          </linearGradient>

          {/* Arrow Stem Gradient (Deep Blue into Bloomberg Orange) */}
          <linearGradient id="nexusArrowStemGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#005BFF" />
            <stop offset="35%" stopColor="#3B82F6" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#FF6B00" />
          </linearGradient>

          {/* Bloomberg / Amber Orange Gradient for the Arrowhead */}
          <linearGradient id="nexusOrangeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5500" />
            <stop offset="50%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
        </defs>

        {/* 1. Outer / Left Cyan Peak Chevron */}
        <path
          d="M 4 128 L 4 85 L 61 10 L 109 68 L 96 82 L 61 36 L 20 89 L 20 113 Z"
          fill="url(#nexusCyanGradient)"
        />

        {/* 2. Lower Parallel Blue Chevron returning upwards */}
        <path
          d="M 61 54 L 108 111 L 152 59 L 166 59 L 108 130 L 61 74 Z"
          fill="url(#nexusBlueGradient)"
        />

        {/* 3. Ascending Arrow Stem (parallel to left slope) */}
        <path
          d="M 108 111 L 148 57 L 136 47 L 96 100 Z"
          fill="url(#nexusArrowStemGradient)"
        />

        {/* 4. Precision Breakout Arrowhead */}
        <polygon
          points="174,4 133,16 148,29 156,38 168,43"
          fill="url(#nexusOrangeGradient)"
        />
      </svg>

      {/* Official Wordmark */}
      {showWordmark && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center text-lg sm:text-xl font-bold tracking-tight font-sans">
            <span className={isDark ? "text-white" : "text-stone-950"}>Nexus</span>
            <span className="bg-gradient-to-r from-[#00D2FF] to-[#0066FF] bg-clip-text text-transparent font-extrabold">
              Desk
            </span>
          </div>

          {showTagline && (
            <span
              className={`text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.24em] mt-0.5 font-bold ${
                isDark ? "text-stone-400" : "text-stone-600"
              }`}
            >
              Research / Analyze / Execute
            </span>
          )}
        </div>
      )}
    </div>
  );
};
