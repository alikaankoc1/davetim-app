import { signOutAction } from "@/app/actions/auth";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/button";

export function PanelHeader({ email }: { email?: string | null }) {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <BrandLogo href="/" />
        <div className="flex items-center gap-3">
          {email ? (
            <p className="hidden max-w-[180px] truncate text-xs text-muted-foreground sm:block">
              {email}
            </p>
          ) : null}
          <Button
            nativeButton={false}
            variant="outline"
            render={<a href="/olustur" />}
            className="hidden h-9 rounded-full px-4 text-sm sm:inline-flex"
          >
            Yeni davetiye
          </Button>
          <form action={signOutAction}>
            <Button
              type="submit"
              variant="ghost"
              className="h-9 rounded-full px-3 text-sm"
            >
              Çıkış
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
