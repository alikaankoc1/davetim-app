"use client";

import { Field, fieldControlClass } from "@/components/editor/Field";
import { useInvitation } from "@/components/editor/invitation-store";
import { EVENT_TYPES, hasPartner, invitationLink, nameLabels } from "@/lib/invitation";
import { cn } from "@/lib/utils";

export function BasicsStep() {
  const { data, slug, update } = useInvitation();
  const labels = nameLabels(data.eventType);
  const partner = hasPartner(data.eventType);

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        Temel <span className="italic text-primary">bilgiler</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        İsimler yazıldıkça özel bağlantın anında oluşur.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {EVENT_TYPES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              update({
                eventType: item.id,
                hostB: hasPartner(item.id) ? data.hostB : "",
              })
            }
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              data.eventType === item.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={cn("mt-6 grid gap-4", partner && "sm:grid-cols-2")}>
        <Field label={labels.a}>
          <input
            value={data.hostA}
            onChange={(event) => update({ hostA: event.target.value })}
            placeholder="Ali"
            className={fieldControlClass}
          />
        </Field>
        {partner ? (
          <Field label={labels.b}>
            <input
              value={data.hostB}
              onChange={(event) => update({ hostB: event.target.value })}
              placeholder="Ayşe"
              className={fieldControlClass}
            />
          </Field>
        ) : null}
      </div>

      <div className="mt-4 rounded-2xl border border-gold/35 bg-secondary/60 px-4 py-3">
        <p className="text-xs text-muted-foreground">Özel bağlantı</p>
        <p className="mt-0.5 font-medium text-primary">{invitationLink(slug)}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Tarih">
          <input
            type="date"
            value={data.date}
            onChange={(event) => update({ date: event.target.value })}
            className={fieldControlClass}
          />
        </Field>
        <Field label="Saat">
          <input
            type="time"
            value={data.time}
            onChange={(event) => update({ time: event.target.value })}
            className={fieldControlClass}
          />
        </Field>
      </div>

      <Field className="mt-6" label="Özel davet mesajı" hint="Kartın üzerinde görünecek kısa bir not.">
        <textarea
          value={data.message}
          onChange={(event) => update({ message: event.target.value })}
          rows={3}
          placeholder="Sizleri bu özel günümüzde yanımızda görmekten mutluluk duyarız."
          className={cn(fieldControlClass, "h-auto resize-none py-3")}
        />
      </Field>
    </div>
  );
}
