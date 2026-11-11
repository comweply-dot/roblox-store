import React from 'react';

interface RobuxIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'gold' | 'green' | 'white';
}

/**
 * Authentic Official Roblox Robux Currency Symbol (⏣)
 * Exact geometry: Hexagonal beveled exterior with the iconic hollow square center.
 * Used beside quantities, prices, cards, headings, and checkout.
 */
export const RobuxIcon: React.FC<RobuxIconProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'gold'
}) => {
  let pixelSize = 18;
  if (typeof size === 'number') {
    pixelSize = size;
  } else {
    switch (size) {
      case 'xs': pixelSize = 13; break;
      case 'sm': pixelSize = 15; break;
      case 'md': pixelSize = 18; break;
      case 'lg': pixelSize = 24; break;
      case 'xl': pixelSize = 32; break;
    }
  }

  // Gradients for gold, green, or white variants
  const gradientId = `robux-grad-${variant}-${pixelSize}`;
  const bevelId = `robux-bevel-${variant}-${pixelSize}`;

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle select-none transition-transform ${className}`}
      aria-label="Robux"
      role="img"
    >
      <defs>
        {variant === 'gold' && (
          <>
            <linearGradient id={gradientId} x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="25%" stopColor="#F5B82E" />
              <stop offset="70%" stopColor="#D98A16" />
              <stop offset="100%" stopColor="#9E5D04" />
            </linearGradient>
            <linearGradient id={bevelId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E5A118" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4A2600" stopOpacity="0.8" />
            </linearGradient>
          </>
        )}
        {variant === 'green' && (
          <>
            <linearGradient id={gradientId} x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id={bevelId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0.8" />
            </linearGradient>
          </>
        )}
        {variant === 'white' && (
          <>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D1D5DB" />
            </linearGradient>
            <linearGradient id={bevelId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4B5563" stopOpacity="0.5" />
            </linearGradient>
          </>
        )}
        {/* Subtle drop shadow for depth */}
        <filter id={`shadow-${pixelSize}`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter={`url(#shadow-${pixelSize})`}>
        {/* Outer Hexagon / Beveled Square with authentic Roblox geometry */}
        {/* Path with hollow center: M outer hexagon ... M inner square reverse */}
        <path
          d="
            M 50 6
            L 87 27.5
            A 6 6 0 0 1 90 32.7
            L 90 67.3
            A 6 6 0 0 1 87 72.5
            L 50 94
            A 6 6 0 0 1 47 94
            L 13 72.5
            A 6 6 0 0 1 10 67.3
            L 10 32.7
            A 6 6 0 0 1 13 27.5
            L 50 6
            Z
            M 36 36
            L 64 36
            L 64 64
            L 36 64
            Z
          "
          fill={`url(#${gradientId})`}
          fillRule="evenodd"
        />

        {/* 3D Highlight Bevel Edge */}
        <path
          d="
            M 50 6
            L 87 27.5
            A 6 6 0 0 1 90 32.7
            L 90 67.3
            A 6 6 0 0 1 87 72.5
            L 50 94
            A 6 6 0 0 1 47 94
            L 13 72.5
            A 6 6 0 0 1 10 67.3
            L 10 32.7
            A 6 6 0 0 1 13 27.5
            L 50 6
            Z
          "
          stroke={`url(#${bevelId})`}
          strokeWidth="3.5"
          fill="none"
        />

        {/* Inner Square Highlight Border */}
        <rect
          x="35.5"
          y="35.5"
          width="29"
          height="29"
          rx="1"
          stroke={`url(#${bevelId})`}
          strokeWidth="3.5"
          fill="none"
        />
      </g>
    </svg>
  );
};
