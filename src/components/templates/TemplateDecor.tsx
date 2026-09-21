import type { BgTextureId, FrameId } from "@/data/templates";
import { cn } from "@/lib/utils";

export function TemplateTexture({
  texture,
  accent,
}: {
  texture: BgTextureId;
  accent: string;
}) {
  if (texture === "none") return null;

  if (texture === "marble") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45] mix-blend-multiply"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(255,255,255,0.55), transparent 55%),
            radial-gradient(ellipse 60% 40% at 75% 65%, rgba(180,170,160,0.35), transparent 50%),
            linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.25) 48%, transparent 56%)
          `,
        }}
      />
    );
  }

  if (texture === "paper") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
      />
    );
  }

  if (texture === "dark-gold") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, ${accent}33, transparent 40%),
            radial-gradient(circle at 80% 70%, ${accent}22, transparent 45%),
            linear-gradient(180deg, transparent, rgba(0,0,0,0.25))
          `,
        }}
      />
    );
  }

  if (texture === "watercolor") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(circle at 12% 18%, ${accent}28, transparent 32%),
            radial-gradient(circle at 88% 22%, ${accent}20, transparent 28%),
            radial-gradient(circle at 80% 82%, ${accent}24, transparent 34%),
            radial-gradient(circle at 18% 78%, ${accent}18, transparent 30%)
          `,
        }}
      />
    );
  }

  if (texture === "stars") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 100 180"
        preserveAspectRatio="xMidYMid slice"
      >
        {[
          [12, 18],
          [28, 42],
          [72, 22],
          [88, 48],
          [18, 78],
          [45, 95],
          [78, 88],
          [55, 35],
          [35, 130],
          [82, 140],
          [10, 150],
          [60, 160],
        ].map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 1.2 : 0.7}
            fill={accent}
            opacity={0.45 + (i % 4) * 0.12}
          />
        ))}
      </svg>
    );
  }

  if (texture === "neon") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #ff4fd844, transparent 35%),
            radial-gradient(circle at 80% 25%, #4fffe044, transparent 30%),
            radial-gradient(circle at 50% 80%, #7a5cff33, transparent 40%)
          `,
        }}
      />
    );
  }

  if (texture === "linen") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 3px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 3px)
          `,
        }}
      />
    );
  }

  if (texture === "damask") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 80 80"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="damask" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M20 4c4 6 8 8 12 8s8-2 12-8c-4 6-4 12 0 18-4-2-8-2-12 0s-8 2-12 0c4-6 4-12 0-18z"
              fill="none"
              stroke={accent}
              strokeWidth="0.6"
            />
            <circle cx="20" cy="20" r="2.5" fill="none" stroke={accent} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#damask)" />
      </svg>
    );
  }

  if (texture === "petals") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, ${accent}30, transparent 22%),
            radial-gradient(circle at 85% 18%, ${accent}28, transparent 20%),
            radial-gradient(circle at 78% 78%, ${accent}22, transparent 24%),
            radial-gradient(circle at 22% 82%, ${accent}26, transparent 22%),
            radial-gradient(circle at 50% 50%, ${accent}12, transparent 40%)
          `,
        }}
      />
    );
  }

  if (texture === "hearts-scatter") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 100 180"
        preserveAspectRatio="xMidYMid slice"
      >
        {[
          [12, 22, 0.35],
          [78, 28, 0.28],
          [22, 70, 0.22],
          [88, 90, 0.3],
          [14, 140, 0.25],
          [70, 155, 0.32],
          [45, 45, 0.18],
          [55, 120, 0.2],
        ].map(([x, y, op], i) => (
          <path
            key={i}
            d={`M${x} ${Number(y) + 3} C${x} ${Number(y) - 2} ${Number(x) - 5} ${Number(y) - 2} ${Number(x) - 5} ${Number(y) + 2} C${Number(x) - 5} ${Number(y) + 6} ${x} ${Number(y) + 9} ${x} ${Number(y) + 9} C${x} ${Number(y) + 9} ${Number(x) + 5} ${Number(y) + 6} ${Number(x) + 5} ${Number(y) + 2} C${Number(x) + 5} ${Number(y) - 2} ${x} ${Number(y) - 2} ${x} ${Number(y) + 3}Z`}
            fill={accent}
            opacity={Number(op)}
          />
        ))}
      </svg>
    );
  }

  return null;
}

export function TemplateFrame({
  frame,
  accent,
  compact,
}: {
  frame: FrameId;
  accent: string;
  compact?: boolean;
}) {
  const inset = compact ? "inset-3" : "inset-4";

  if (frame === "none") return null;

  if (frame === "gold-foil" || frame === "minimal-line") {
    return (
      <>
        <div
          aria-hidden
          className={cn("pointer-events-none absolute rounded-[1.15rem] border", inset)}
          style={{ borderColor: `${accent}66` }}
        />
        {frame === "gold-foil" ? (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute rounded-[0.95rem] border border-dashed opacity-50",
              compact ? "inset-5" : "inset-6"
            )}
            style={{ borderColor: `${accent}55` }}
          />
        ) : null}
      </>
    );
  }

  if (frame === "ornate") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        preserveAspectRatio="none"
      >
        <rect
          x="14"
          y="14"
          width="172"
          height="272"
          rx="18"
          fill="none"
          stroke={accent}
          strokeWidth="1.2"
          opacity="0.55"
        />
        <path
          d="M40 28 C70 40,130 40,160 28"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          opacity="0.45"
        />
        <path
          d="M40 272 C70 260,130 260,160 272"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          opacity="0.45"
        />
      </svg>
    );
  }

  if (frame === "floral-corners" || frame === "eucalyptus") {
    const leaf = frame === "eucalyptus";
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        fill="none"
      >
        {/* Top-left */}
        <g opacity="0.75" transform="translate(8,10)">
          <ellipse cx="18" cy="28" rx="10" ry="18" fill={accent} opacity="0.2" transform="rotate(-25 18 28)" />
          <ellipse cx="32" cy="18" rx="8" ry="14" fill={accent} opacity="0.28" transform="rotate(15 32 18)" />
          <ellipse cx="22" cy="12" rx="7" ry="12" fill={accent} opacity={leaf ? 0.35 : 0.22} transform="rotate(-40 22 12)" />
          {!leaf ? (
            <circle cx="14" cy="14" r="5" fill={accent} opacity="0.35" />
          ) : null}
        </g>
        {/* Top-right */}
        <g opacity="0.75" transform="translate(152,10) scale(-1,1) translate(-40,0)">
          <ellipse cx="18" cy="28" rx="10" ry="18" fill={accent} opacity="0.2" transform="rotate(-25 18 28)" />
          <ellipse cx="32" cy="18" rx="8" ry="14" fill={accent} opacity="0.28" transform="rotate(15 32 18)" />
          <ellipse cx="22" cy="12" rx="7" ry="12" fill={accent} opacity={leaf ? 0.35 : 0.22} transform="rotate(-40 22 12)" />
          {!leaf ? (
            <circle cx="14" cy="14" r="5" fill={accent} opacity="0.35" />
          ) : null}
        </g>
        {/* Bottom-left */}
        <g opacity="0.7" transform="translate(8,250) scale(1,-1) translate(0,-40)">
          <ellipse cx="18" cy="28" rx="10" ry="18" fill={accent} opacity="0.18" transform="rotate(-25 18 28)" />
          <ellipse cx="30" cy="16" rx="8" ry="14" fill={accent} opacity="0.25" transform="rotate(20 30 16)" />
        </g>
        {/* Bottom-right */}
        <g opacity="0.7" transform="translate(152,250) scale(-1,-1) translate(-40,-40)">
          <ellipse cx="18" cy="28" rx="10" ry="18" fill={accent} opacity="0.18" transform="rotate(-25 18 28)" />
          <ellipse cx="30" cy="16" rx="8" ry="14" fill={accent} opacity="0.25" transform="rotate(20 30 16)" />
        </g>
      </svg>
    );
  }

  if (frame === "henna") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        fill="none"
      >
        <rect
          x="16"
          y="16"
          width="168"
          height="268"
          rx="4"
          stroke={accent}
          strokeWidth="1"
          opacity="0.55"
        />
        <path
          d="M100 28c8 10 18 14 28 14s20-4 28-14c-8 10-8 22 0 32-8-4-16-4-28 0s-20 4-28 0c8-10 8-22 0-32z"
          stroke={accent}
          strokeWidth="0.9"
          opacity="0.65"
        />
        <path
          d="M100 272c8-10 18-14 28-14s20 4 28 14c-8-10-8-22 0-32-8 4-16 4-28 0s-20-4-28 0c8 10 8 22 0 32z"
          stroke={accent}
          strokeWidth="0.9"
          opacity="0.65"
        />
        <circle cx="100" cy="150" r="22" stroke={accent} strokeWidth="0.7" opacity="0.25" />
        <path
          d="M100 128c6 8 14 12 22 12"
          stroke={accent}
          strokeWidth="0.7"
          opacity="0.4"
        />
      </svg>
    );
  }

  if (frame === "geometric") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        fill="none"
      >
        <rect x="22" y="28" width="36" height="36" stroke={accent} strokeWidth="1" opacity="0.45" transform="rotate(12 40 46)" />
        <rect x="148" y="230" width="28" height="28" stroke={accent} strokeWidth="1" opacity="0.5" transform="rotate(-18 162 244)" />
        <path d="M160 40 L180 60 L160 80 L140 60 Z" stroke={accent} strokeWidth="1" opacity="0.4" />
        <path d="M30 220 L50 240 L30 260" stroke={accent} strokeWidth="1" opacity="0.35" />
        <line x1="70" y1="40" x2="130" y2="40" stroke={accent} strokeWidth="0.8" opacity="0.35" />
        <line x1="70" y1="260" x2="130" y2="260" stroke={accent} strokeWidth="0.8" opacity="0.35" />
      </svg>
    );
  }

  if (frame === "crown-stars") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        fill="none"
      >
        <path
          d="M78 36 L86 52 L100 40 L114 52 L122 36 L118 58 L82 58 Z"
          fill={accent}
          opacity="0.55"
        />
        <circle cx="28" cy="70" r="1.5" fill={accent} opacity="0.7" />
        <circle cx="172" cy="88" r="1.2" fill={accent} opacity="0.6" />
        <circle cx="40" cy="240" r="1.4" fill={accent} opacity="0.55" />
        <circle cx="160" cy="250" r="1.6" fill={accent} opacity="0.65" />
        <path d="M100 68 L102 74 L108 74 L103 78 L105 84 L100 80 L95 84 L97 78 L92 74 L98 74 Z" fill={accent} opacity="0.5" />
      </svg>
    );
  }

  if (frame === "balloons") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        fill="none"
      >
        <ellipse cx="28" cy="42" rx="12" ry="16" fill="#F7A8C0" opacity="0.55" />
        <path d="M28 58 Q30 68 26 78" stroke="#D46A8C" strokeWidth="0.8" opacity="0.5" />
        <ellipse cx="48" cy="34" rx="10" ry="14" fill="#A8D4F7" opacity="0.5" />
        <path d="M48 48 Q50 58 46 70" stroke="#6B8FCE" strokeWidth="0.8" opacity="0.45" />
        <ellipse cx="172" cy="48" rx="11" ry="15" fill="#C8E8B8" opacity="0.5" />
        <path d="M172 63 Q170 74 174 86" stroke="#7AAD6A" strokeWidth="0.8" opacity="0.45" />
        <ellipse cx="155" cy="36" rx="9" ry="13" fill="#F7D4A8" opacity="0.5" />
        <ellipse cx="36" cy="250" rx="10" ry="14" fill="#D4B8F7" opacity="0.4" />
        <ellipse cx="168" cy="255" rx="11" ry="15" fill="#F7A8C0" opacity="0.4" />
      </svg>
    );
  }

  if (frame === "neon-glow") {
    return (
      <>
        <div
          aria-hidden
          className={cn("pointer-events-none absolute rounded-[1.2rem]", inset)}
          style={{
            boxShadow: `inset 0 0 0 1.5px ${accent}99, 0 0 24px ${accent}44`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-10 h-16 rounded-full blur-2xl"
          style={{ background: `${accent}33` }}
        />
      </>
    );
  }

  if (frame === "hearts" || frame === "confetti-hearts") {
    const confetti = frame === "confetti-hearts";
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        fill="none"
      >
        {(
          [
            [28, 36, 1],
            [168, 42, 0.9],
            [40, 250, 0.85],
            [160, 255, 0.9],
            [100, 32, 1.15],
            ...(confetti
              ? ([
                  [55, 70, 0.55],
                  [145, 80, 0.5],
                  [70, 220, 0.5],
                  [130, 210, 0.55],
                  [100, 260, 0.6],
                ] as const)
              : []),
          ] as const
        ).map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={0.55}>
            <path
              d="M0 4 C0 -1 -6 -1 -6 3 C-6 7 0 11 0 11 C0 11 6 7 6 3 C6 -1 0 -1 0 4Z"
              fill={accent}
            />
          </g>
        ))}
        {confetti
          ? [22, 55, 90, 120, 155, 178].map((x, i) => (
              <circle
                key={`c-${i}`}
                cx={x}
                cy={48 + (i % 3) * 70}
                r={1.6}
                fill={accent}
                opacity={0.35}
              />
            ))
          : null}
      </svg>
    );
  }

  if (frame === "heart-balloons") {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        fill="none"
      >
        <g opacity="0.7">
          <path
            d="M36 48 C36 40 28 40 28 46 C28 52 36 58 36 58 C36 58 44 52 44 46 C44 40 36 40 36 48Z"
            fill="#F7A8C0"
          />
          <path d="M36 58 Q38 72 34 88" stroke="#D46A8C" strokeWidth="0.8" opacity="0.6" />
        </g>
        <g opacity="0.65">
          <path
            d="M58 38 C58 31 51 31 51 36 C51 41 58 47 58 47 C58 47 65 41 65 36 C65 31 58 31 58 38Z"
            fill="#FF8FAB"
          />
          <path d="M58 47 Q60 60 56 76" stroke="#D46A8C" strokeWidth="0.7" opacity="0.5" />
        </g>
        <g opacity="0.7">
          <path
            d="M164 46 C164 38 156 38 156 44 C156 50 164 56 164 56 C164 56 172 50 172 44 C172 38 164 38 164 46Z"
            fill="#A8D4F7"
          />
          <path d="M164 56 Q162 70 166 86" stroke="#6B8FCE" strokeWidth="0.8" opacity="0.55" />
        </g>
        <ellipse cx="148" cy="34" rx="9" ry="12" fill="#F7D4A8" opacity="0.55" />
        <path d="M148 46 Q146 58 150 72" stroke="#C49A6C" strokeWidth="0.7" opacity="0.45" />
        <g opacity="0.5" transform="translate(42 248)">
          <path d="M0 4 C0 -1 -5 -1 -5 2.5 C-5 6 0 10 0 10 C0 10 5 6 5 2.5 C5 -1 0 -1 0 4Z" fill="#D4B8F7" />
        </g>
        <g opacity="0.5" transform="translate(160 252)">
          <path d="M0 4 C0 -1 -5 -1 -5 2.5 C-5 6 0 10 0 10 C0 10 5 6 5 2.5 C5 -1 0 -1 0 4Z" fill="#F7A8C0" />
        </g>
      </svg>
    );
  }

  if (frame === "roses" || frame === "peony-bloom" || frame === "wildflowers") {
    const dense = frame === "peony-bloom";
    const wild = frame === "wildflowers";
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 300"
        fill="none"
      >
        {/* Top-left bloom cluster */}
        <g opacity="0.8" transform="translate(6,8)">
          <ellipse cx="22" cy="34" rx="11" ry="18" fill={accent} opacity="0.18" transform="rotate(-30 22 34)" />
          <ellipse cx="38" cy="22" rx="9" ry="15" fill={accent} opacity="0.22" transform="rotate(18 38 22)" />
          <circle cx="18" cy="16" r={dense ? 8 : 6} fill={accent} opacity={dense ? 0.4 : 0.32} />
          <circle cx="28" cy="12" r={dense ? 6 : 4.5} fill={accent} opacity="0.28" />
          {wild ? (
            <>
              <circle cx="40" cy="30" r="3" fill={accent} opacity="0.35" />
              <circle cx="12" cy="28" r="2.5" fill={accent} opacity="0.3" />
            </>
          ) : null}
          <path d="M24 24 Q20 40 16 52" stroke={accent} strokeWidth="1" opacity="0.35" />
        </g>
        {/* Top-right */}
        <g opacity="0.8" transform="translate(150,8) scale(-1,1) translate(-44,0)">
          <ellipse cx="22" cy="34" rx="11" ry="18" fill={accent} opacity="0.18" transform="rotate(-30 22 34)" />
          <ellipse cx="38" cy="22" rx="9" ry="15" fill={accent} opacity="0.22" transform="rotate(18 38 22)" />
          <circle cx="18" cy="16" r={dense ? 8 : 6} fill={accent} opacity={dense ? 0.4 : 0.32} />
          <circle cx="28" cy="12" r={dense ? 6 : 4.5} fill={accent} opacity="0.28" />
        </g>
        {/* Bottom clusters */}
        <g opacity="0.72" transform="translate(4,248)">
          <ellipse cx="24" cy="20" rx="12" ry="16" fill={accent} opacity="0.2" transform="rotate(20 24 20)" />
          <circle cx="16" cy="14" r="5.5" fill={accent} opacity="0.3" />
          <circle cx="28" cy="10" r="4" fill={accent} opacity="0.25" />
          {dense ? <circle cx="34" cy="22" r="5" fill={accent} opacity="0.28" /> : null}
        </g>
        <g opacity="0.72" transform="translate(152,248) scale(-1,1) translate(-44,0)">
          <ellipse cx="24" cy="20" rx="12" ry="16" fill={accent} opacity="0.2" transform="rotate(20 24 20)" />
          <circle cx="16" cy="14" r="5.5" fill={accent} opacity="0.3" />
          <circle cx="28" cy="10" r="4" fill={accent} opacity="0.25" />
        </g>
        {wild ? (
          <>
            <circle cx="100" cy="40" r="2.2" fill={accent} opacity="0.35" />
            <circle cx="90" cy="255" r="2" fill={accent} opacity="0.3" />
            <circle cx="110" cy="260" r="2.4" fill={accent} opacity="0.28" />
          </>
        ) : null}
      </svg>
    );
  }

  return null;
}
