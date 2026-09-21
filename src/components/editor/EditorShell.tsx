"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhonePreview } from "@/components/editor/PhonePreview";
import { PreviewDrawer } from "@/components/editor/PreviewDrawer";
import { StepIndicator } from "@/components/editor/StepIndicator";
import { BasicsStep } from "@/components/editor/steps/BasicsStep";
import { ExtrasStep } from "@/components/editor/steps/ExtrasStep";
import { TemplateStep } from "@/components/editor/steps/TemplateStep";
import { VenueStep } from "@/components/editor/steps/VenueStep";
import {
  InvitationProvider,
  useInvitation,
} from "@/components/editor/invitation-store";
import { INVITATION_STORAGE_KEY, type EventTypeId, type ThemeId } from "@/lib/invitation";


function EditorInner() {
  const router = useRouter();
  const { data, slug } = useInvitation();
  const [step, setStep] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);

  const canFinish = data.hostA.trim().length > 0;
  const isLast = step === 4;

  const stepView = useMemo(() => {
    if (step === 1) return <TemplateStep />;
    if (step === 2) return <BasicsStep />;
    if (step === 3) return <VenueStep />;
    return <ExtrasStep />;
  }, [step]);

  function goNext() {
    if (step === 2 && !canFinish) return;
    setStep((current) => Math.min(4, current + 1));
  }

  function complete() {
    if (!canFinish) {
      setStep(2);
      return;
    }
    const payload = { ...data, slug };
    window.localStorage.setItem(INVITATION_STORAGE_KEY, JSON.stringify(payload));
    router.push(`/basarili?slug=${encodeURIComponent(slug)}`);
  }

  return (
    <div className="relative min-h-svh overflow-x-clip bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
            </span>
            <span className="font-heading text-xl font-semibold tracking-tight">
              Davetim
            </span>
          </a>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Adım {step} / 4
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-24 pb-28 sm:px-6 md:grid-cols-[minmax(0,1fr)_280px] md:gap-10 md:px-8 md:pb-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <div className="min-w-0">
          <div className="sticky top-16 z-30 -mx-1 bg-background/85 px-1 py-2 backdrop-blur-md">
            <StepIndicator current={step} onSelect={setStep} />
          </div>
          <div className="mt-8 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {stepView}
              </motion.div>
            </AnimatePresence>
          </div>

          {step === 2 && !canFinish ? (
            <p className="mt-6 text-sm text-primary">Devam etmek için bir isim girin.</p>
          ) : null}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={step === 1}
              onClick={() => setStep((current) => Math.max(1, current - 1))}
              className="h-11 w-full rounded-full px-5 sm:w-auto"
            >
              <ArrowLeft className="size-4" />
              Geri
            </Button>

            {isLast ? (
              <Button
                type="button"
                onClick={complete}
                className="h-11 w-full rounded-full px-6 shadow-[0_12px_36px_-8px_oklch(0.42_0.11_22_/_0.5)] sm:w-auto"
              >
                Davetiyeyi Tamamla ve Paylaş
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={goNext}
                className="h-11 w-full rounded-full px-6 sm:w-auto"
              >
                Kaydet ve İlerle
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <aside className="hidden md:block">
          <div className="sticky top-24">
            <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
              Canlı önizleme
            </p>
            <PhonePreview />
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 p-3 backdrop-blur-xl md:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={() => setPreviewOpen(true)}
          className="h-11 w-full rounded-full"
        >
          <Eye className="size-4" />
          Davetiyemi Önizle
        </Button>
      </div>

      <PreviewDrawer open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
}

export function EditorShell({
  initialTheme,
  initialEventType,
}: {
  initialTheme?: ThemeId;
  initialEventType?: EventTypeId;
}) {
  return (
    <InvitationProvider
      initial={{
        ...(initialTheme ? { theme: initialTheme } : {}),
        ...(initialEventType ? { eventType: initialEventType } : {}),
      }}
    >
      <EditorInner />
    </InvitationProvider>
  );
}
