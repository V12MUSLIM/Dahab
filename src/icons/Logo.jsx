export default function Logo() {
  return (
    <svg
      viewBox="0 0 160 40"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" className="dark:stop-[#38bdf8]" />
          <stop offset="100%" stopColor="#60a5fa" className="dark:stop-[#0ea5e9]" />
        </linearGradient>

        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c2d12" className="dark:stop-[#78350f]" />
          <stop offset="100%" stopColor="#d97706" className="dark:stop-[#f59e0b]" />
        </linearGradient>

        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" className="dark:stop-[#fde68a]" />
          <stop offset="100%" stopColor="#f59e0b" className="dark:stop-[#fbbf24]" />
        </radialGradient>
      </defs>

      <g>
        <circle
          cx="20"
          cy="20"
          r="16"
          className="fill-slate-100 dark:fill-slate-900 stroke-yellow-500 dark:stroke-yellow-400"
          strokeWidth="1"
        />

        <path
          d="M 8 26 L 14 16 L 20 26 L 17 26 L 23 18 L 29 26 L 32 26 L 32 32 L 8 32 Z"
          fill="url(#mountainGrad)"
          opacity="0.9"
        />
        <path
          d="M 8 28 Q 14 26 20 28 T 32 28 L 32 32 L 8 32 Z"
          fill="url(#oceanGrad)"
        />
        <circle cx="26" cy="14" r="3" fill="url(#sunGrad)" />

        <g transform="translate(12,26) scale(0.3)">
          <rect x="-1" y="0" width="2" height="8" className="fill-amber-900 dark:fill-amber-700" rx="1" />
          <path d="M 0 0 Q -4 -3 -6 -1 Q -5 -2 -3 -1" className="fill-green-500 dark:fill-green-400" />
          <path d="M 0 0 Q 4 -3 6 -1 Q 5 -2 3 -1" className="fill-green-500 dark:fill-green-400" />
          <path
            d="M 0 0 Q 0 -4 0 -6"
            className="fill-green-500 dark:fill-green-400 stroke-green-600 dark:stroke-green-400"
            strokeWidth="0.5"
          />
        </g>
      </g>

      <text
        x="48"
        y="18"
        fontFamily="'Playfair Display', serif"
        fontSize="18"
        fontWeight="bold"
        className="fill-yellow-500 dark:fill-yellow-400"
      >
        DAHAB
      </text>
      <text
        x="48"
        y="30"
        fontFamily="sans-serif"
        fontSize="10"
        className="fill-slate-500 dark:fill-slate-300"
        opacity="0.85"
      >
        Red Sea Paradise
      </text>
      <path
        d="M 48 32 Q 52 30 56 32 T 64 32 T 72 32"
        className="stroke-sky-400 dark:stroke-sky-300"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
