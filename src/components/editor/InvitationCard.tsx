import {
  TemplateFrame,
  TemplateTexture,
} from "@/components/templates/TemplateDecor";
import {
  getTemplateById,
  type BodyFontId,
  type HeadingFontId,
  type InvitationTemplate,
} from "@/data/templates";
import {
  displayNames,
  eventCardLabel,
  formatDisplayDate,
  formatDisplayTime,
  MUSIC_OPTIONS,
  type InvitationData,
} from "@/lib/invitation";
import { cn } from "@/lib/utils";

const headingFontClass: Record<HeadingFontId, string> = {
  "great-vibes": "font-great-vibes",
  "alex-brush": "font-alex-brush",
  cinzel: "font-cinzel",
  cormorant: "font-cormorant",
  playfair: "font-heading",
  montserrat: "font-montserrat",
};

const bodyFontClass: Record<BodyFontId, string> = {
  cormorant: "font-cormorant",
  montserrat: "font-montserrat",
  outfit: "font-sans",
  cinzel: "font-cinzel",
};

export type CardContent = {
  names: string;
  eventLabel: string;
  dateLine: string;
  venue?: string;
  message?: string;
  giftNote?: string;
  musicLabel?: string;
  rsvpEnabled?: boolean;
};

function contentFromInvitation(data: InvitationData): CardContent {
  const date = formatDisplayDate(data.date);
  const time = formatDisplayTime(data.time);
  const dateLine = [date || "Tarih yakında", time].filter(Boolean).join(" · ");
  const music =
    data.music !== "none"
      ? MUSIC_OPTIONS.find((option) => option.id === data.music)?.label
      : undefined;

  return {
    names: displayNames(data),
    eventLabel: eventCardLabel(data.eventType),
    dateLine,
    venue: data.venueName.trim() || undefined,
    message: data.message.trim() || undefined,
    giftNote: data.giftNote.trim() || undefined,
    musicLabel: music,
    rsvpEnabled: data.rsvpEnabled,
  };
}

function contentFromTemplate(template: InvitationTemplate): CardContent {
  return {
    names: template.sampleNames,
    eventLabel: template.eventLabel,
    dateLine: template.sampleDate,
    rsvpEnabled: false,
  };
}

export function InvitationCardFace({
  template,
  content,
  compact = false,
}: {
  template: InvitationTemplate;
  content: CardContent;
  compact?: boolean;
}) {
  const headingClass = headingFontClass[template.fontPairing.heading];
  const bodyClass = bodyFontClass[template.fontPairing.body];
  const titleSize = compact
    ? template.fontPairing.heading === "great-vibes" ||
      template.fontPairing.heading === "alex-brush"
      ? "text-[1.85rem]"
      : "text-[1.45rem]"
    : template.fontPairing.heading === "great-vibes" ||
        template.fontPairing.heading === "alex-brush"
      ? "text-[2.65rem]"
      : "text-[1.85rem]";

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 py-8 text-center"
      style={{
        background: template.bgGradient,
        backgroundColor: template.bgColor,
        color: template.textColor,
      }}
    >
      <TemplateTexture texture={template.bgTexture} accent={template.accentColor} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 backdrop-blur-[0.5px]"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${template.bgColor}22 50%, transparent 100%)`,
          opacity: template.overlayOpacity ?? 0.2,
        }}
      />

      <TemplateFrame
        frame={template.frame}
        accent={template.accentColor}
        compact={compact}
      />

      <div className="relative z-10 flex max-w-[90%] flex-col items-center">
        <p
          className={cn(
            bodyClass,
            "text-[10px] font-medium tracking-[0.32em] uppercase"
          )}
          style={{ color: template.mutedColor }}
        >
          {content.eventLabel}
        </p>

        <div
          className="my-4 h-px w-12"
          style={{
            background: `linear-gradient(90deg, transparent, ${template.accentColor}, transparent)`,
          }}
        />

        <p
          className={cn(headingClass, titleSize, "leading-[1.1]")}
          style={{ color: template.textColor }}
        >
          {content.names}
        </p>

        <p
          className={cn(bodyClass, "mt-4 text-sm tracking-[0.14em]")}
          style={{ color: template.accentColor }}
        >
          {content.dateLine}
        </p>

        {content.venue ? (
          <p
            className={cn(bodyClass, "mt-3 text-sm")}
            style={{ color: template.mutedColor }}
          >
            {content.venue}
          </p>
        ) : null}

        {content.message ? (
          <p
            className={cn(
              bodyClass,
              "mt-5 max-w-[18ch] text-sm leading-relaxed"
            )}
            style={{ color: template.mutedColor }}
          >
            {content.message}
          </p>
        ) : null}

        {content.giftNote ? (
          <p
            className={cn(bodyClass, "mt-4 max-w-[22ch] text-[11px] leading-relaxed")}
            style={{ color: template.mutedColor }}
          >
            {content.giftNote}
          </p>
        ) : null}

        {content.musicLabel ? (
          <p
            className={cn(bodyClass, "mt-3 text-[10px] tracking-[0.12em]")}
            style={{ color: template.accentColor }}
          >
            ♪ {content.musicLabel}
          </p>
        ) : null}

        {content.rsvpEnabled ? (
          <p
            className={cn(
              bodyClass,
              "mt-5 text-[10px] font-medium tracking-[0.24em] uppercase"
            )}
            style={{ color: template.mutedColor }}
          >
            Katılım bekleniyor
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function InvitationCard({
  data,
  compact = false,
}: {
  data: InvitationData;
  compact?: boolean;
}) {
  const template = getTemplateById(data.theme);
  return (
    <InvitationCardFace
      template={template}
      content={contentFromInvitation(data)}
      compact={compact}
    />
  );
}

export function TemplateGalleryCard({
  template,
  compact = false,
}: {
  template: InvitationTemplate;
  compact?: boolean;
}) {
  return (
    <InvitationCardFace
      template={template}
      content={contentFromTemplate(template)}
      compact={compact}
    />
  );
}
