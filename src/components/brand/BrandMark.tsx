import { cn } from "@/lib/utils";

/** Net, küçük boyutta okunan marka rozeti (SVG) */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-10 shrink-0", className)}
    >
      <circle cx="32" cy="32" r="30" fill="#6B2E2E" />
      <circle
        cx="32"
        cy="32"
        r="27"
        fill="none"
        stroke="#C9A36A"
        strokeWidth="1.5"
        opacity="0.85"
      />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fill="#E8C97A"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontWeight="700"
      >
        D
      </text>
    </svg>
  );
}
