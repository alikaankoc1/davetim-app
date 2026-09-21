import { Instagram, Mail, Sparkles } from "lucide-react";

const footerLinks = [
  { href: "#tasarimlar", label: "Tasarımlar" },
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#paketler", label: "Paketler" },
  { href: "#sss", label: "SSS" },
];

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

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-[linear-gradient(180deg,transparent_0%,oklch(0.955_0.014_82)_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-16 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#hero" className="inline-flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" />
              </span>
              <span className="font-heading text-xl font-semibold tracking-tight">
                Davetim
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              En özel gününüz için yeni nesil dijital davetiye. Zarif tasarımlar,
              akıllı LCV ve paylaşılabilir anılar.
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
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <XIcon className="size-4" />
              </a>
              <a
                href="mailto:merhaba@davetim.app"
                aria-label="E-posta"
                className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Mail className="size-4" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              merhaba@davetim.app
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Davetim. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <a href="#sss" className="hover:text-foreground">
              Gizlilik
            </a>
            <a href="#sss" className="hover:text-foreground">
              KVKK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
