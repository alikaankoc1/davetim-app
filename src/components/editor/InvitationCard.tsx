import {
  displayNames,
  eventCardLabel,
  formatDisplayDate,
  formatDisplayTime,
  type InvitationData,
} from "@/lib/invitation";
import { cn } from "@/lib/utils";

function Names({ data, className }: { data: InvitationData; className: string }) {
  return <p className={className}>{displayNames(data)}</p>;
}

function Meta({
  data,
  className,
}: {
  data: InvitationData;
  className: string;
}) {
  const date = formatDisplayDate(data.date) || "Tarih yakında";
  const time = formatDisplayTime(data.time);
  return (
    <p className={className}>
      {date}
      {time ? ` · ${time}` : ""}
    </p>
  );
}

export function InvitationCard({
  data,
  compact = false,
}: {
  data: InvitationData;
  compact?: boolean;
}) {
  const titleSize = compact ? "text-2xl" : "text-[2.15rem]";
  const event = eventCardLabel(data.eventType);
  const message = data.message.trim();
  const venue = data.venueName.trim();

  if (data.theme === "luks") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#2a1416_0%,#3d1c20_55%,#241114_100%)] px-6 py-8 text-center">
        <div className="absolute inset-4 rounded-[1.1rem] border border-gold/40" />
        <p className="relative font-cormorant text-[10px] tracking-[0.38em] text-gold uppercase">
          {event}
        </p>
        <div className="relative my-4 h-px w-14 bg-gold/70" />
        <Names
          data={data}
          className={cn(
            "relative font-cormorant leading-[1.05] text-[#f6eee3]",
            titleSize
          )}
        />
        <Meta
          data={data}
          className="relative mt-4 font-cormorant text-sm tracking-[0.18em] text-gold"
        />
        {venue ? (
          <p className="relative mt-3 font-cormorant text-sm tracking-[0.12em] text-[#f6eee3]/80">
            {venue}
          </p>
        ) : null}
        {message ? (
          <p className="relative mt-5 max-w-[16ch] font-cormorant text-sm leading-relaxed text-[#f6eee3]/70">
            {message}
          </p>
        ) : null}
        {data.rsvpEnabled ? (
          <p className="relative mt-5 font-cormorant text-[10px] tracking-[0.28em] text-gold/80 uppercase">
            LCV bekleniyor
          </p>
        ) : null}
      </div>
    );
  }

  if (data.theme === "floral") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fbf3ea_0%,#f3ddd2_100%)] px-6 py-8 text-center">
        <div className="absolute -top-8 -left-8 size-28 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute -right-6 -bottom-10 size-32 rounded-full bg-gold/25 blur-2xl" />
        <div className="absolute inset-5 rounded-[1.2rem] border border-primary/15" />
        <p className="relative font-cormorant text-[10px] tracking-[0.32em] text-primary/80 uppercase">
          {event}
        </p>
        <Names
          data={data}
          className={cn(
            "relative mt-4 font-cormorant leading-[1.05] text-foreground",
            titleSize
          )}
        />
        <div className="relative mt-3 h-px w-10 bg-primary/30" />
        <Meta
          data={data}
          className="relative mt-3 font-cormorant text-sm tracking-[0.16em] text-primary"
        />
        {venue ? (
          <p className="relative mt-3 font-cormorant text-sm text-foreground/70">
            {venue}
          </p>
        ) : null}
        {message ? (
          <p className="relative mt-5 max-w-[18ch] font-cormorant text-sm leading-relaxed text-foreground/65">
            {message}
          </p>
        ) : null}
        {data.rsvpEnabled ? (
          <p className="relative mt-4 font-cormorant text-[10px] tracking-[0.24em] text-primary/70 uppercase">
            LCV bekleniyor
          </p>
        ) : null}
      </div>
    );
  }

  if (data.theme === "geometrik") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[#f7f1e8] px-6 py-8 text-center">
        <div className="absolute top-6 left-6 size-16 rotate-12 border border-primary/25" />
        <div className="absolute right-7 bottom-8 size-20 -rotate-6 border border-gold/50" />
        <div className="absolute top-1/3 right-5 size-8 rotate-45 bg-primary/10" />
        <p className="relative text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
          {event}
        </p>
        <Names
          data={data}
          className={cn(
            "relative mt-4 font-heading leading-[1.05] text-foreground",
            titleSize
          )}
        />
        <Meta
          data={data}
          className="relative mt-4 text-xs font-medium tracking-[0.18em] text-primary"
        />
        {venue ? (
          <p className="relative mt-3 text-sm text-foreground/70">{venue}</p>
        ) : null}
        {message ? (
          <p className="relative mt-5 max-w-[18ch] text-sm leading-relaxed text-muted-foreground">
            {message}
          </p>
        ) : null}
        {data.rsvpEnabled ? (
          <p className="relative mt-4 text-[10px] font-medium tracking-[0.24em] text-primary/70 uppercase">
            LCV bekleniyor
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-[#fbfaf7] px-6 py-8 text-center">
      <div className="absolute inset-6 border border-foreground/10" />
      <p className="relative font-cormorant text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
        {event}
      </p>
      <Names
        data={data}
        className={cn(
          "relative mt-5 font-cormorant leading-[1.05] text-foreground",
          titleSize
        )}
      />
      <div className="relative my-4 h-px w-12 bg-foreground/15" />
      <Meta
        data={data}
        className="relative font-cormorant text-sm tracking-[0.16em] text-foreground/70"
      />
      {venue ? (
        <p className="relative mt-3 font-cormorant text-sm text-foreground/60">
          {venue}
        </p>
      ) : null}
      {message ? (
        <p className="relative mt-5 max-w-[18ch] font-cormorant text-sm leading-relaxed text-foreground/55">
          {message}
        </p>
      ) : null}
      {data.rsvpEnabled ? (
        <p className="relative mt-4 font-cormorant text-[10px] tracking-[0.24em] text-foreground/45 uppercase">
          LCV bekleniyor
        </p>
      ) : null}
    </div>
  );
}
