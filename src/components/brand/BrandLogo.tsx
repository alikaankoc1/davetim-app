import { BrandMark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
};

export function BrandLogo({
  href = "/",
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
}: BrandLogoProps) {
  return (
    <a
      href={href}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <BrandMark
        className={cn(
          "size-11 drop-shadow-[0_6px_16px_oklch(0.42_0.11_22_/_0.35)]",
          markClassName
        )}
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-heading text-[1.5rem] font-semibold tracking-tight text-foreground sm:text-[1.65rem]",
            wordmarkClassName
          )}
        >
          Davetim
        </span>
      ) : null}
    </a>
  );
}
