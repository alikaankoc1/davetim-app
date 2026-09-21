"use client";

import { Field, fieldControlClass } from "@/components/editor/Field";
import { useInvitation } from "@/components/editor/invitation-store";
import { cn } from "@/lib/utils";

export function VenueStep() {
  const { data, update } = useInvitation();

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        Mekan & <span className="italic text-primary">konum</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Misafirlerin tek dokunuşla yolu bulsun.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        <Field label="Mekan adı">
          <input
            value={data.venueName}
            onChange={(event) => update({ venueName: event.target.value })}
            placeholder="The Plaza Hotel"
            className={fieldControlClass}
          />
        </Field>
        <Field label="Açık adres">
          <textarea
            value={data.address}
            onChange={(event) => update({ address: event.target.value })}
            rows={3}
            placeholder="Teşvikiye Cad. No: 12, Şişli / İstanbul"
            className={cn(fieldControlClass, "h-auto resize-none py-3")}
          />
        </Field>
        <Field
          label="Google Maps / Yandex linki"
          hint="Navigasyon butonu bu bağlantıyı açar."
        >
          <input
            type="url"
            value={data.mapsUrl}
            onChange={(event) => update({ mapsUrl: event.target.value })}
            placeholder="https://maps.google.com/..."
            className={fieldControlClass}
          />
        </Field>
      </div>
    </div>
  );
}
