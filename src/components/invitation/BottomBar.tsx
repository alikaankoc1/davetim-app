"use client";

import { Camera, HeartHandshake, MapPinned } from "lucide-react";
import type { InvitationData } from "@/lib/invitation";
import { cn } from "@/lib/utils";

export function BottomBar({ data }: { data: InvitationData }) {
  const items = [
    {
      href: "#rsvp",
      label: "Katılım",
      icon: HeartHandshake,
      show: data.rsvpEnabled,
    },
    {
      href: "#harita",
      label: "Haritaya Git",
      icon: MapPinned,
      show: true,
    },
    {
      href: "#fotograf",
      label: "Fotoğraf Yükle",
      icon: Camera,
      show: true,
    },
  ].filter((item) => item.show);

  return (
    <nav
      aria-label="Hızlı erişim"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/92 p-2 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <a
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-2.5 text-[11px] font-medium text-muted-foreground transition",
                  "active:bg-primary/10 active:text-primary"
                )}
              >
                <Icon className="size-4 text-primary" />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
