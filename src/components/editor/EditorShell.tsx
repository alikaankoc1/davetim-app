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
import { getTemplateById, isTemplateId } from "@/data/templates";
import {
  INVITATION_STORAGE_KEY,
  type EventTypeId,
  type ThemeId,
} from "@/lib/invitation";
import { cn } from "@/lib/utils";

function EditorInner({
  startStep,
  presetFromGallery,
}: {
  startStep: number;
  presetFromGallery: boolean;
}) {
  const router = useRouter();
  const { data, slug } = useInvitation();
  const [step, setStep] = useState(startStep);
  const [previewOpen, setPreviewOpen] = useState(false);

  const hasTemplate = isTemplateId(data.theme);
  const canFinish = data.hostA.trim().length > 0;
  const isLast = step === 4;
  const selectedTitle = hasTemplate ? getTemplateById(data.theme).title : null;

  function goToStep(next: number) {
    if (next > 1 && !hasTemplate) {
      setStep(1);
      return;
    }
    setStep(next);
  }

  function goNext() {
    if (step === 1 && !hasTemplate) return;
    if (step === 2 && !canFinish) return;
    setStep((current) => Math.min(4, current + 1));
  }

  const stepView = useMemo(() => {
    if (step === 1) {
      return (
        <TemplateStep
          presetFromGallery={presetFromGallery}
          onContinue={goNext}
        />
      );
    }
    if (step === 2) return <BasicsStep />;
    if (step === 3) return <VenueStep />;
    return <ExtrasStep />;
  }, [step, presetFromGallery, hasTemplate, canFinish]);

  function complete() {
    if (!hasTemplate) {
      setStep(1);
      return;
    }
    if (!canFinish) {
      setStep(2);
      return;
    }
    const payload = { ...data, slug };
    window.localStorage.setItem(INVITATION_STORAGE_KEY, JSON.stringify(payload));
    router.push(`/basarili?slug=${encodeURIComponent(slug)}`);
  }

  const showPhone = step > 1 && hasTemplate;

  return (
    <div className="relative min-h-svh overflow-x-clip bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div
          className={cn(
            "mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8",
            step === 1 ? "max-w-7xl" : "max-w-6xl"
          )}
        >
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
            </span>
            <span className="font-heading text-xl font-semibold tracking-tight">
              Davetim
            </span>
          </a>
          <div className="hidden text-right sm:block">
            <p className="text-sm text-muted-foreground">Adım {step} / 4</p>
            {selectedTitle ? (
              <p className="text-xs font-medium text-primary">{selectedTitle}</p>
            ) : null}
          </div>
        </div>
      </header>

      <div
        className={cn(
          "mx-auto gap-10 px-4 pt-24 sm:px-6 md:px-8",
          step === 1
            ? "max-w-7xl pb-16"
            : "grid max-w-6xl pb-28 md:grid-cols-[minmax(0,1fr)_280px] md:gap-10 md:pb-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14"
        )}
      >
        <div className="min-w-0">
          <div className="sticky top-16 z-30 -mx-1 bg-background/85 px-1 py-2 backdrop-blur-md">
            <StepIndicator current={step} onSelect={goToStep} />
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

          {step === 1 && !hasTemplate ? (
            <p className="mt-6 text-sm text-primary">
              Bir şablon seçmeden ilerleyemezsin.
            </p>
          ) : null}
          {step === 2 && !canFinish ? (
            <p className="mt-6 text-sm text-primary">
              Devam etmek için bir isim girin.
            </p>
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
                disabled={step === 1 && !hasTemplate}
                className="h-11 w-full rounded-full px-6 sm:w-auto"
              >
                {step === 1 ? "Şablonla devam et" : "Kaydet ve İlerle"}
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {showPhone ? (
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
                Canlı önizleme
              </p>
              <PhonePreview />
            </div>
          </aside>
        ) : null}
      </div>

      {showPhone ? (
        <>
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
        </>
      ) : null}
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
  const presetFromGallery = Boolean(initialTheme);

  return (
    <InvitationProvider
      initial={{
        ...(initialTheme ? { theme: initialTheme } : {}),
        ...(initialEventType ? { eventType: initialEventType } : {}),
      }}
    >
      <EditorInner
        startStep={presetFromGallery ? 2 : 1}
        presetFromGallery={presetFromGallery}
      />
    </InvitationProvider>
  );
}
