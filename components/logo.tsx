export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M16 7V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 16H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 9L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M23 9L9 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
