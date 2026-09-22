import { Mail } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";

const footerLinks = [
  { href: "#tasarimlar", label: "Tasarımlar" },
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#paketler", label: "Paketler" },
  { href: "#sss", label: "SSS" },
];

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
            <a
              href="mailto:merhaba@davetim.app"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4 text-primary" />
              merhaba@davetim.app
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border/70 pt-6 text-center text-xs text-muted-foreground sm:text-left">
          <p>© {new Date().getFullYear()} Davetim. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
