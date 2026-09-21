"use client";

import { Field, fieldControlClass } from "@/components/editor/Field";
import { useInvitation } from "@/components/editor/invitation-store";
import { MUSIC_OPTIONS } from "@/lib/invitation";
import { cn } from "@/lib/utils";

export function ExtrasStep() {
  const { data, update } = useInvitation();

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        Ekstra <span className="italic text-primary">özellikler</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Müziği, hediye notunu ve LCV’yi dilediğin gibi ayarla.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        <Field label="Fon müziği">
          <select
            value={data.music}
            onChange={(event) =>
              update({ music: event.target.value as (typeof MUSIC_OPTIONS)[number]["id"] })
            }
            className={fieldControlClass}
          >
            {MUSIC_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Hediye / IBAN notu"
          hint="İstersen boş bırak. Kartta küçük bir not olarak görünür."
        >
          <textarea
            value={data.giftNote}
            onChange={(event) => update({ giftNote: event.target.value })}
            rows={3}
            placeholder="Çiçek yerine bir dilek... IBAN: TR00 ACCT-000003 0000 00"
            className={cn(fieldControlClass, "h-auto resize-none py-3")}
          />
        </Field>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card px-4 py-4">
          <div>
            <p className="text-sm font-medium">LCV / RSVP formu</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Açıkken misafirler “geliyorum / gelemiyorum” diye katılım bildirir.
              İsim alanı değil; davetli listesi için bir yanıttır.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={data.rsvpEnabled}
            onClick={() => update({ rsvpEnabled: !data.rsvpEnabled })}
            className={cn(
              "relative h-7 w-12 rounded-full transition-colors",
              data.rsvpEnabled ? "bg-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-6 rounded-full bg-white shadow-sm transition-transform",
                data.rsvpEnabled && "translate-x-5"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
