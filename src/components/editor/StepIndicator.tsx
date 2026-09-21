import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Tema" },
  { id: 2, label: "Bilgiler" },
  { id: 3, label: "Mekan" },
  { id: 4, label: "Ekstralar" },
];

export function StepIndicator({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (step: number) => void;
}) {
  return (
    <ol className="flex items-center gap-2">
      {steps.map((step, index) => {
        const active = current === step.id;
        const done = current > step.id;
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(step.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-1 py-1 text-left",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  active && "bg-primary text-primary-foreground",
                  done && "bg-primary/15 text-primary",
                  !active && !done && "bg-muted text-muted-foreground"
                )}
              >
                {step.id}
              </span>
              <span className="hidden text-sm font-medium sm:inline">
                {step.label}
              </span>
            </button>
            {index < steps.length - 1 ? (
              <span
                className={cn(
                  "h-px flex-1",
                  done ? "bg-primary/40" : "bg-border"
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
