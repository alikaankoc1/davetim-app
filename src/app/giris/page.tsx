import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SignInForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Giriş | Davetim",
};

type PageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function GirisPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const next =
    params.next && params.next.startsWith("/") && !params.next.startsWith("//")
      ? params.next
      : "/panel";

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blush/80 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-[2rem] border border-border/70 bg-card/80 p-8 text-center shadow-[0_24px_60px_-32px_rgba(40,20,16,0.4)]">
        <BrandLogo href="/" className="justify-center" />
        <h1 className="font-heading mt-6 text-3xl font-semibold tracking-tight">
          Hesabına <span className="italic text-primary">giriş yap</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Davetiyelerini ve katılım yanıtlarını panelden yönet.
        </p>
        {params.error ? (
          <p className="mt-4 text-sm text-primary">
            Giriş tamamlanamadı. Tekrar dene.
          </p>
        ) : null}
        <SignInForm next={next} />
        <p className="mt-6 text-sm text-muted-foreground">
          Hesabın yok mu?{" "}
          <a
            href={`/kayit?next=${encodeURIComponent(next)}`}
            className="font-medium text-primary hover:underline"
          >
            Kayıt ol
          </a>
        </p>
      </div>
    </main>
  );
}
