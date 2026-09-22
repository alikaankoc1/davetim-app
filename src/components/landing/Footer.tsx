import { Mail } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";

const footerLinks = [
  { href: "#tasarimlar", label: "Tasarımlar" },
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#paketler", label: "Paketler" },
  { href: "#sss", label: "SSS" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2H21l-6.51 7.44L22 22h-6.79l-4.32-6.53L6.2 22H3.44l7.01-8.01L2 2h6.96l3.9 5.98L18.244 2Zm-1.19 18.2h1.88L7.03 3.7H5.02l12.034 16.5Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.36 6.34 6.34 0 0 0 9.5 21.7a6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.84a4.85 4.85 0 0 1-1.01-.15Z" />
    </svg>
  );
}

const socialClassName =
  "flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-[linear-gradient(180deg,transparent_0%,oklch(0.955_0.014_82)_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-16 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandLogo href="#hero" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              En özel gününüz için yeni nesil dijital davetiye. Zarif tasarımlar,
              katılım formu ve paylaşılabilir bağlantı.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Hızlı menü</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">İletişim</p>
            <div className="mt-4 flex items-center gap-3">
              <span
                role="img"
                aria-label="Instagram (yakında)"
                title="Instagram — link yakında"
                className={socialClassName}
              >
                <InstagramIcon className="size-4" />
              </span>
              <span
                role="img"
                aria-label="X (yakında)"
                title="X — link yakında"
                className={socialClassName}
              >
                <XIcon className="size-4" />
              </span>
              <span
                role="img"
                aria-label="TikTok (yakında)"
                title="TikTok — link yakında"
                className={socialClassName}
              >
                <TikTokIcon className="size-4" />
              </span>
              <a
                href="mailto:merhaba@davetim.app"
                aria-label="E-posta"
                className={socialClassName}
              >
                <Mail className="size-4" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              merhaba@davetim.app
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border/70 pt-6 text-center text-xs text-muted-foreground sm:text-left">
          <p>© {new Date().getFullYear()} Davetim. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
