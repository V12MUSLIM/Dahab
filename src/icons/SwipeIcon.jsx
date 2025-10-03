export default function SwipeIcon({ className = "w-12 h-12" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 64 64"
      className={className}
    >
      {/* Left Arrow */}
      <path
        d="M16 32H4l8-8m-8 8l8 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right Arrow */}
      <path
        d="M48 32h12l-8-8m8 8l-8 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hand / swipe indicator */}
      <path
        d="M28 20v20c0 4 8 4 8 0V20c0-4-8-4-8 0z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}
