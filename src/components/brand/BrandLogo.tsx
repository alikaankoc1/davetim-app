import Image from "next/image";
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
    <a href={href} className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/davetim-logo.png"
        alt="Davetim"
        width={36}
        height={36}
        className={cn(
          "size-9 rounded-full object-cover shadow-[0_0_18px_oklch(0.42_0.11_22_/_0.28)]",
          markClassName
        )}
        priority
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-heading text-[1.35rem] font-semibold tracking-tight text-foreground sm:text-[1.45rem]",
            wordmarkClassName
          )}
        >
          Davetim
        </span>
      ) : null}
    </a>
  );
}
