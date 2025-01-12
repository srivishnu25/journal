export default function JournalLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 60"
      fill="none"
      role="img"
    >
      <g>
        <rect x="5" y="5" width="50" height="50" rx="8" fill="#2563eb" />
        <path
          d="M15 20h30v25H15z"
          fill="white"
          stroke="#2563eb"
          strokeWidth="2"
          rx="2"
        />
        <circle cx="25" cy="30" r="2" fill="#2563eb" />
        <circle cx="35" cy="30" r="2" fill="#2563eb" />
        <path
          d="M23 38c4 2 8 2 12 0"
          stroke="#2563eb"
          strokeWidth="2"
          fill="none"
        />
      </g>
      <text
        x="70"
        y="40"
        fontFamily="Inter, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="white"
      >
        Journal
      </text>
    </svg>
  );
}
