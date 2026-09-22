import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/button";

type PageProps = {
  searchParams: Promise<{ paket?: string }>;
};

const PLAN_LABELS: Record<string, string> = {
  temel: "Temel Davetiye",
  premium: "Premium Paket",
  vip: "VIP Özel Tasarım",
};

export default async function OdemePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const paket = params.paket?.trim() || "";
  const planName = PLAN_LABELS[paket] ?? (paket || null);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-16">
      <BrandLogo href="/" />
      <div className="mt-10 w-full max-w-md text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Ödeme <span className="italic text-primary">yakında</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Ödeme altyapısı henüz bağlanmadı. Şimdilik davetiyeni ücretsiz
          oluşturup paylaşabilirsin.
        </p>
        {planName ? (
          <p className="mt-4 text-sm font-medium text-foreground">
            Seçilen paket: {planName}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            nativeButton={false}
            render={<a href="/olustur" />}
            className="h-11 rounded-full px-6"
          >
            Davetiye oluştur
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={<a href="/#paketler" />}
            className="h-11 rounded-full px-6"
          >
            Paketlere dön
          </Button>
        </div>
      </div>
    </main>
  );
}
