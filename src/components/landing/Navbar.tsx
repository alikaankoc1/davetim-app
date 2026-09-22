"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#tasarimlar", label: "Tasarımlar" },
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#paketler", label: "Paketler" },
  { href: "#sss", label: "SSS" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
          <BrandLogo href="#hero" />

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-base"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              nativeButton={false}
              render={<a href="/olustur" />}
              className="h-10 rounded-full px-5 text-[0.9375rem]"
            >
              Davetiye Oluştur
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground md:hidden"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-0 top-full border-b border-border/60 bg-background/95 px-4 py-5 shadow-[0_16px_40px_-24px_rgba(40,20,16,0.35)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-base font-medium text-foreground",
                    "hover:bg-muted"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button
                nativeButton={false}
                render={<a href="/olustur" onClick={() => setOpen(false)} />}
                className="mt-3 h-11 rounded-full text-[0.9375rem]"
              >
                Davetiye Oluştur
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
